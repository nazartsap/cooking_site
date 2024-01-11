import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import IngredientList from './IngredientList';
import RecipeList from './RecipeList';
import PopularRecipes from './PopularRecipes';
import popularRecipesData from '../services/recipesData';
import ingredientData from '../services/ingredients';
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
    const filteredRecipes = popularRecipes.filter((recipe) =>
      selectedIngredients.every((ingredient) => recipe.ingredients.includes(ingredient))
    );
    setRecipes(filteredRecipes);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='block'>
        <IngredientList 
          ingredients={ingredientData}
          onSelect={handleIngredientSelect}
        />
        <RecipeList recipes={recipes} selectedIngredients={selectedIngredients}/>
        <PopularRecipes popularRecipes={popularRecipes} />
      </div>
    </DndProvider>
  );
};

export default Home;