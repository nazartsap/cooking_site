import React from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetailPage = ({ recipes }) => {
  const { recipeId } = useParams();
  const selectedRecipe = recipes.find(recipe => recipe.id === parseInt(recipeId));

  if (!selectedRecipe) {
    return <div>Рецепт не найден</div>;
  }

  return (
    <div>
      <h2>{selectedRecipe.title}</h2>
      <img src={selectedRecipe.img} alt={selectedRecipe.title} />
      <p>{selectedRecipe.description}</p>
      <p>Рейтинг: {selectedRecipe.rating}</p>
    </div>
  );
};

export default RecipeDetailPage;
