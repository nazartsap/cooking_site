import React from 'react';
import '../styles/Home.css'
import RecipeCard from './RecipeCard';
const RecipeList = ({ recipes, selectedIngredients }) => {
  return (
    <div className='recipe_list_block'>
      <h2 className='hader'>Рецепты</h2>
      <h2>
        <input className = 'find_placeholder' type="text" placeholder="Найди рецепты"  />
      </h2>
      <ul className='selected-ingredients-container'>
        {selectedIngredients.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        ))}
      </ul>
      <div className="recipe-list">
        {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
    </div>
  );
};

export default RecipeList;
