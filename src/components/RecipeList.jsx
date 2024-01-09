import React from 'react';
import '../styles/Home.css'
const RecipeList = ({ recipes }) => {
  return (
    <div className='recipe_list_block'>
      <h2 className='hader'>Рецепты</h2>
      <h2>
        <input className = 'find_placeholder' type="text" placeholder="Найди рецепты"  />
      </h2>
      <ul className='selected-ingredients-container'>
        {recipes.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
