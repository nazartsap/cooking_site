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
  const [showCuisineMenu, setShowCuisineMenu] = useState(false); // Состояние для отображения/скрытия меню выбора кухни
  const [sortedByLikes, setSortedByLikes] = useState(false);
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
// Функция для сортировки рецептов по количеству лайков
const sortedRecipes = sortedByLikes ? [...filteredRecipes].sort((a, b) => b.likes - a.likes) : filteredRecipes;
  return (
    <div className="recipe_list_block">
      <h2 className="hader">Рецепты</h2>
      <div className="filters">
      <div className="cuisine-filter">
          <div className="cuisine-dropdown">
            <button className="select-menu" onClick={() => setShowCuisineMenu(!showCuisineMenu)}>Выбрать кухнью</button>
            {showCuisineMenu && (
              <div className="cuisine-menu">
                <label>
                  <input type="checkbox" value="Русская"  />
                  Русская
                </label>
                <label>
                  <input type="checkbox" value="Итальянская" />
                  Итальянская
                </label>
              </div>
            )}
          </div>
        </div>
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
      <div className="sort-by-likes">
          <button className="select-menu"  onClick={() => setShowCuisineMenu(!showCuisineMenu)}>Сортировать по</button>
          {showCuisineMenu &&(
          <label>
            <input type="checkbox" checked={sortedByLikes} onChange={() => setSortedByLikes(!sortedByLikes)} />
            По убыванию
          </label>
          )}
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
