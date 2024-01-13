import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import '../styles/Recipe.css';

const Recipe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://important-cyan-sandals.cyclic.app/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []); // Пустой массив зависимостей означает, что useEffect будет вызываться только при монтировании компонента

  return (
    <div>
      <h2 className='header'>Рецепты</h2>
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
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} id={recipe.id} name={recipe.name} instructions={recipe.instructions} imageUrl={recipe.imageUrl} likes={recipe.likes}/>
        ))}
      </div>
    </div>
  );
};

export default Recipe;
