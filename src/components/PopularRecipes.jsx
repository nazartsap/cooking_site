import React from 'react';

const PopularRecipes = ({ popularRecipes }) => {
  return (
    <div>
      <h2>Популярные рецепты</h2>
      <ul>
        {popularRecipes.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularRecipes;
