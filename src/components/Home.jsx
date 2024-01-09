import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import IngredientList from './IngredientList';
import RecipeList from './RecipeList';
import PopularRecipes from './PopularRecipes';
import popularRecipesData from '../services/recipesData';
import '../styles/Home.css';
const Home = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState(popularRecipesData);

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    generateRecipes([...selectedIngredients, ingredient]);
  };

  const generateRecipes = (selectedIngredients) => {
    const generatedRecipes = selectedIngredients.map((ingredient, index) => (
      <div className='selected-ingredients' key={index}>
        {ingredient}
      </div>
    ));
    setRecipes(generatedRecipes);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='block'>
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