import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../config';
import '../styles/TopRecipes.css'
import RecipeCard from './RecipeCard';
const TopRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/recipes`);
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []); // Пустой массив зависимостей означает, что useEffect будет вызываться только при монтировании компонента
  const filteredRecipes = [...recipes].sort((a, b) => b.likes - a.likes);
  return (
    <div className='top_recipes-contaner'>
      <h2 className='heder-create-recipes'>Популярные рецепты</h2>
      <div className="top-recipe-cards-container">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} id={recipe._id} name={recipe.name} instructions={recipe.instructions} imageUrl={recipe.imageUrl} likes={recipe.likes} />
        ))}
      </div>
    </div>
  );
};

export default TopRecipes;
