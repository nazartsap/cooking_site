import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import recipesData from '../services/recipesData';
import '../styles/Recipe.css'
const Recipe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes] = useState(recipesData)
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
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipe;
