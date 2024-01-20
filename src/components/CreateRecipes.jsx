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
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
      // Проверка наличия обязательных полей
      if (!nameRecipe || !instrtutionRecipe) {
        console.error('Name and instructions are required fields.');
        return;
      }
  
      // Подготовка данных для отправки на сервер
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('name', nameRecipe);
      formData.append('instructions', instrtutionRecipe);
  
      // Добавление идентификаторов ингредиентов
      selectedIngredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}]`, ingredient.id);
      });

      console.log(selectedImage)
  
      // Отправка POST-запроса на сервер с использованием FormData
      const response = await axios.post(`${apiUrl}/recipes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Обработка успешного ответа, например, очистка формы
      console.log('Recipe created successfully:', response.data);
      setRecipeName('');
      setInstructionRecipe('');
      setSelectedIngredients([]);
      setSelectedImage(null); // Очистка выбранного изображения
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
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
        <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className='block'>
          <IngredientList onSelect={handleIngredientSelect} selectedIngredients={selectedIngredients} onIngredientRemove={handleIngredientRemove} />
        </div>
      </DndProvider>
      <button className='btn-primary_create-recipe' onClick={handleCreateRecipe}>
        Создать рецепт
      </button>
      {showSuccessMessage && (
        <div className='success-message'>
          Рецепт успешно создан!
        </div>
      )}
    </div>
  );
};

export default CreateRecipes;
