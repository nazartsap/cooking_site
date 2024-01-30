import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/RecipeDetailPage.css";
import axios from "axios";
import apiUrl from "../config";

const RecipeDetailPage = () => {
  const [ recipe, setRecipe ] = useState([]);
  const { recipeId } = useParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [recipeId]);

  // const selectedRecipe = recipes.find(recipe => String(recipe._id) === String(recipeId));
  if (!recipe) {
    return <div>Рецепт не найден</div>;
  }

  return (
    <div className="recipe-cont">
      <h2 className="title-recipe-detail">{recipe.name}</h2>
      <img src={recipe.imageUrl} alt={recipe.name} />
      <p className="description-recipe-detail">{recipe.instructions}</p>
      {recipe.ingredients && recipe.ingredients.length > 0 && (
          <p>
            Ингредиенты: {' '}
            {recipe.ingredients.map((ingredient) => (
              <span key={ingredient._id}>{ingredient.name}, </span>
            ))}
          </p>
        )}
      <p>Рейтинг: {recipe.likes}</p>
    </div>
  );
};

export default RecipeDetailPage;
