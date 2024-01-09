import React from 'react';
import '../styles/Home.css'
import RecipeCard from './RecipeCard';
const PopularRecipes = ({ popularRecipes }) => {
  return (
    <div className='popular_recipes'>
      <h2 className='hader'>Популярные рецепты</h2>
      <div className="recipe-cards-container">
        {popularRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default PopularRecipes;
