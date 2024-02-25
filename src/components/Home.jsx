import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import apiUrl from '../config';
import IngredientList from './IngredientList';
import RecipeList from './RecipeList';
import axios from 'axios'; 
import '../styles/Home.css';

const Home = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/recipes`);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleIngredientSelect = (ingredientId, ingredientName) => {
    setSelectedIngredients(prevIngredients => [
      ...prevIngredients, 
      { id: ingredientId, name: ingredientName }
    ]);
    generateRecipes([...selectedIngredients, ingredientId]);
  };

  const handleIngredientRemove = (ingredientId) => {
    setSelectedIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
    );
    generateRecipes(selectedIngredients, searchTerm);
  };

  const handleSearchTermChange = (newTerm) => {
    setSearchTerm(newTerm);
    generateRecipes(selectedIngredients, newTerm);
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
  
  //   axios.get(`${apiUrl}/recipes/searchByIngredients?${queryString}`)
  //     .then((response) => setRecipes(response.data))
  //     .catch((error) => console.error('Error fetching recipes:', error));
  // 
};

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='block-home-elements'>
        <IngredientList onSelect={handleIngredientSelect} onRemove={handleIngredientRemove} />
        <RecipeList recipes={recipes} selectedIngredients={selectedIngredients} searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange} />
      </div>
    </DndProvider>
  );
};
export default Home;