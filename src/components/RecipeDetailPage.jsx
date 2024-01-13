import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/RecipeDetailPage.css'
const RecipeDetailPage = ({ recipes }) => {
  const { recipeId } = useParams();
  const selectedRecipe = recipes.find(recipe => recipe.id === parseInt(recipeId));

  if (!selectedRecipe) {
    return <div>Рецепт не найден</div>;
  }

  return (
    <div className='recipe-cont'>
      <h2 className='title-recipe-detail'>{selectedRecipe.title}</h2>
      <img src={selectedRecipe.img} alt={selectedRecipe.title} />
      <p className='description-recipe-detail'>{selectedRecipe.description}</p>
      <p>Рейтинг: {selectedRecipe.rating}</p>
    </div>
  );
};

export default RecipeDetailPage;
