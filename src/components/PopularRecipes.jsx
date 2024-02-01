import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../config';
import '../styles/Home.css'
import RecipeCard from './RecipeCard';
const PopularRecipes = () => {
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
    <div className='popular_recipes'>
      <h2 className='hader'>Популярные рецепты</h2>
      <div className="popular-recipe-cards-container">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
          id={recipe._id}
          name={recipe.name}
          instructions={recipe.instructions}
          imageUrl={recipe.imageUrl}
          likes={recipe.likes}
          ingredients={recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};

export default PopularRecipes;
