// RecipeList.js
import React, { useState } from "react";
import "../styles/Home.css";
import RecipeCard from "./RecipeCard";

const RecipeList = ({
  recipes,
  selectedIngredients,
  searchTerm,
  onSearchTermChange,
  onIngredientRemove,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const handleLocalSearchTermChange = (newTerm) => {
    setLocalSearchTerm(newTerm);
    onSearchTermChange(newTerm);
  };

  const handleIngredientRemove = (ingredientId) => {
    onIngredientRemove(ingredientId);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    // Проверяем, содержит ли название рецепта строку поиска
    const includesSearchTerm = recipe.name
      .toLowerCase()
      .includes(localSearchTerm.toLowerCase());
  
    // Проверяем, содержит ли рецепт хотя бы один из выбранных ингредиентов
    const includesAnySelectedIngredient =
      selectedIngredients.length === 0 ||
      selectedIngredients.some((selectedIngredient) =>
        recipe.ingredients.some(
          (recipeIngredient) =>
            recipeIngredient._id === selectedIngredient.id
        )
      );
  
    // Возвращаем true только если оба условия выполнены
    return includesAnySelectedIngredient && includesSearchTerm;
  });

  return (
    <div className="recipe_list_block">
      <h2 className="hader">Рецепты</h2>
      <div className="input-find-ingredient">
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Поиск "
            name="text"
            id="text"
            value={localSearchTerm}
            onChange={(e) => handleLocalSearchTermChange(e.target.value)}
          />
          <label htmlFor="name" className="form__label">
            Поиск{" "}
          </label>
        </div>
      </div>
      <ul className="selected-ingredients-container">
        {selectedIngredients.map((ingredient) => (
          <li
            key={ingredient.id}
            onClick={() => handleIngredientRemove(ingredient.id)}
          >
            {ingredient.name}
          </li>
        ))}
      </ul>
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            name={recipe.name}
            instructions={recipe.instructions}
            imageUrl={recipe.imageUrl}
            likes={recipe.likes}
            ingredients={recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
