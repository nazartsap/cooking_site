import React, { useState } from 'react';
import '../styles/Home.css';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, selectedIngredients, searchTerm, onSearchTermChange }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleLocalSearchTermChange = (newTerm) => {
    setLocalSearchTerm(newTerm);
    onSearchTermChange(newTerm);
  };

  return (
    <div className='recipe_list_block'>
      <h2 className='hader'>Рецепты</h2>
      <div className='input-find-ingredient'>
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Поиск "
            name="text"
            id='text'
            value={localSearchTerm}
            onChange={(e) => handleLocalSearchTermChange(e.target.value)}
          />
          <label htmlFor="name" className="form__label">Поиск </label>
        </div>
      </div>
      <ul className='selected-ingredients-container'>
        {selectedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.name}</li>
        ))}
      </ul>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} id={recipe.id} name={recipe.name} instructions={recipe.instructions} imageUrl={recipe.imageUrl} likes={recipe.likes}/>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
