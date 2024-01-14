import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import IngredientList from './IngredientList';
import RecipeList from './RecipeList';
import PopularRecipes from './PopularRecipes';
import recipesData from '../services/recipesData';
import ingredientData from '../services/ingredients';
import axios from 'axios'; // Добавлен импорт axios
import '../styles/Home.css';

const Home = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState(recipesData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleIngredientSelect = (ingredientId, ingredientName) => {
    setSelectedIngredients(prevIngredients => [
      ...prevIngredients, 
      { id: ingredientId, name: ingredientName }
    ]);
    generateRecipes([...selectedIngredients, ingredientId]);
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
  
    axios.get(`https://important-cyan-sandals.cyclic.app/recipes/searchByIngredients?${queryString}`)
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error('Error fetching recipes:', error));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='block'>
        {/* Ваши компоненты */}
        <IngredientList onSelect={handleIngredientSelect} />
        <RecipeList recipes={recipes} selectedIngredients={selectedIngredients} searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange}  onIngredientRemove={handleIngredientRemove} />
        <PopularRecipes popularRecipes={popularRecipes} />
      </div>
    </DndProvider>
  );
};

export default Home;
