import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import IngredientList from './IngredientList';
import RecipeList from './RecipeList';
import PopularRecipes from './PopularRecipes';

const Home = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState(['рецепт 1', 'рецепт 2', 'рецепт 3']);

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    generateRecipes([...selectedIngredients, ingredient]);
  };

  const generateRecipes = (selectedIngredients) => {
    const generatedRecipes = [
      `${selectedIngredients.join(', ')}`,
      `Another recipe with ${selectedIngredients.join(', ')}`,
    ];
    setRecipes(generatedRecipes);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex',justifyContent:'space-around', alignItems: 'center' }}>
        <IngredientList 
          ingredients={['Яйцо', 'Мука', 'Марковка']}
          onSelect={handleIngredientSelect}
        />
        <RecipeList recipes={recipes} />
        <PopularRecipes popularRecipes={popularRecipes} />
      </div>
    </DndProvider>
  );
};

export default Home;