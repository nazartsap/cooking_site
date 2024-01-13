import React from 'react';
import '../styles/Home.css'
import RecipeCard from './RecipeCard';
const RecipeList = ({ recipes, selectedIngredients }) => {
  return (
    <div className='recipe_list_block'>
      <h2 className='hader'>Рецепты</h2>
      <div className='input-find-ingredient'>
      <div className="form__group field">
        <input
          type="text"
          class="form__field"
          placeholder="Поиск "
          name="text"
          id='text'/>
        <label for="name" className="form__label">Поиск </label>
      </div>
      </div>
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
