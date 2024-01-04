import React from 'react';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      <h2>Рецепты</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
