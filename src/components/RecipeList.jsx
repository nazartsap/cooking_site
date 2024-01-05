import React from 'react';
import '../styles/RecipeList.css'
const RecipeList = ({ recipes }) => {
  return (
    <div className='recipe_list_block'>
      <h2>Рецепты</h2>
      <h2>
        <input className = 'find_placeholder' type="text" placeholder="Найди рецепты"  />
      </h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
