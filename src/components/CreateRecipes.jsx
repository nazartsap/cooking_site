import React, { useState } from 'react';
import '../styles/CreateRecipes.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import recipesData from '../services/recipesData';
import IngredientList from '../services/IngredientList_for_Create';
import apiUrl from '../config';
import axios from 'axios';

const CreateRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState(recipesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [nameRecipe, setRecipeName] = useState('');
  const [instrtutionRecipe, setInstructionRecipe] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleIngredientSelect = (ingredientId, ingredientName) => {
    setSelectedIngredients(prevIngredients => [
      ...prevIngredients,
      { id: ingredientId, name: ingredientName }
    ]);
    generateRecipes([...selectedIngredients, ingredientId]);
  };

  const setItam = (e) => {
    setRecipeName(e.target.value);
    console.log(nameRecipe);
  };

  const setInstructions = (e) => {
    setInstructionRecipe(e.target.value);
    console.log(instrtutionRecipe);
  };

  const handleSearchTermChange = (newTerm) => {
    setSearchTerm(newTerm);
    generateRecipes(selectedIngredients, newTerm);
  };

  const handleIngredientRemove = (ingredientId) => {
    setSelectedIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
    );
    generateRecipes(selectedIngredients, searchTerm);
  };

  const generateRecipes = (selectedIngredients, search = '') => {
    console.log(selectedIngredients);
    const encodedIngredients = selectedIngredients.map(ingredient => {
      if (typeof ingredient === 'string') {
        return encodeURIComponent(ingredient);
      } else {
        return encodeURIComponent(ingredient.id);
      }
    });

    const queryString = `ingredients=${encodedIngredients.join(',')}`;
    console.log(queryString);

    axios.get(`${apiUrl}/recipes/searchByIngredients?${queryString}`)
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error('Error fetching recipes:', error));
  };

  const handleCreateRecipe = async () => {
    try {
      // Подготовка данных для отправки на сервер
      const newRecipe = {
        name: nameRecipe,
        instructions: instrtutionRecipe,
        ingredients: selectedIngredients.map(ingredient => ingredient.id),
      };

      // Отправка POST-запроса на сервер
      const response = await axios.post(`${apiUrl}/recipes`, newRecipe);

      // Обработка успешного ответа, например, очистка формы
      console.log('Recipe created successfully:', response.data);
      setRecipeName('');
      setInstructionRecipe('');
      setSelectedIngredients([]);

      // Можете также выполнить перенаправление или выполнить другие действия по вашему выбору
    } catch (error) {
      // Обработка ошибки, например, отображение сообщения об ошибке
      console.error('Error creating recipe:', error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <div className='create-block'>
      <h1>Создать свои рецепты</h1>
      <div className='inputs'>
        <input type='text' placeholder='Название' onChange={(e) => setItam(e)} />
        <textarea placeholder='Инструкции' rows="4" cols="80" id="TITLE" onChange={(e) => setInstructions(e)} />
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className='block'>
          <IngredientList onSelect={handleIngredientSelect} selectedIngredients={selectedIngredients} onIngredientRemove={handleIngredientRemove} />
        </div>
      </DndProvider>
      <button className='btn-primary_create-recipe' onClick={handleCreateRecipe}>
        Создать рецепт
      </button>
    </div>
  );
};

export default CreateRecipes;
