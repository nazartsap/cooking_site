import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import popularRecipesData from '../services/recipesData';

const Recipe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [popularRecipes] = useState(popularRecipesData)
  return (
    <div>
      <h2 className='hader'>Рецепты</h2>
      <div>
        <input
          type="text"
          placeholder="Поиск по рецептам"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Искать</button>
      </div>
      <div className="recipe-cards-container">
        {popularRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipe;
