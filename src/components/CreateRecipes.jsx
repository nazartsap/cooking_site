import React, { useState } from 'react';
import '../styles/CreateRecipes.css'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import recipesData from '../services/recipesData'
import IngredientList from '../services/IngredientList_for_Create';
import apiUrl from '../config';
import axios from 'axios'
const CreateRecipes= () =>{
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
        // Если элемент является строкой, это означает, что это первый выбранный ингредиент
        return encodeURIComponent(ingredient);
      } else {
        // Если элемент является объектом, это означает, что это второй (или последующий) выбранный ингредиент
        return encodeURIComponent(ingredient.id);
      }
    });
  
    const queryString = `ingredients=${encodedIngredients.join(',')}`;
    console.log(queryString);
  
    axios.get(`${apiUrl}/recipes/searchByIngredients?${queryString}`)
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error('Error fetching recipes:', error));
  };

  return (
    <div className='create-block'>
        <h1>Создать свои рецепты</h1>
      <div className='inputs'>
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Название "
            name="text"
            id='text'
            onChange={(e) => setItam(e)}
          />
          <label htmlFor="name" className="form__label">Название </label>
        </div>
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Инструкции "
            name="text"
            id='text'
            onChange={(e) => setInstructions(e)}
          />
          <label htmlFor="name" className="form__label">Инструкции </label>
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
      <div className='block'>
        <IngredientList onSelect={handleIngredientSelect} selectedIngredients={selectedIngredients}  onIngredientRemove={handleIngredientRemove}/>
      </div>
    </DndProvider>
    </div>
  );
}
export default CreateRecipes;
