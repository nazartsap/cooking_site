import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import "../styles/Recipe.css";
import apiUrl from "../config";

const Recipe = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [sortedByLikes, setSortedByLikes] = useState(false);
  const [showCuisineMenu, setShowCuisineMenu] = useState(false); // Состояние для отображения/скрытия меню выбора кухни

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/recipes`);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  // Обработчик изменения значения в поле ввода
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Обработчик изменения выбранных кухонь
  const handleCuisineChange = (cuisine) => {
    setSelectedCuisines((prevSelectedCuisines) => {
      if (prevSelectedCuisines.includes(cuisine)) {
        return prevSelectedCuisines.filter((selectedCuisine) => selectedCuisine !== cuisine);
      } else {
        return [...prevSelectedCuisines, cuisine];
      }
    });
  };

  // Функция для фильтрации рецептов по введенному термину и выбранным кухням
  const filteredRecipes = recipes.filter((recipe) => {
    const includesSearchTerm = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const includesSelectedCuisines = selectedCuisines.length === 0 || selectedCuisines.some((cuisine) => recipe.cuisines.includes(cuisine));
    return includesSearchTerm && includesSelectedCuisines;
  });

  // Функция для сортировки рецептов по количеству лайков
  const sortedRecipes = sortedByLikes ? [...filteredRecipes].sort((a, b) => b.likes - a.likes) : filteredRecipes;

  return (
    <div className="recipe-container">
      <h2 className="heder-create-recipes">Рецепты</h2>
      <div className="filters">
        <div className="cuisine-filter">
          <h3>Фильтр по кухням:</h3>
          <div className="cuisine-dropdown">
            <button onClick={() => setShowCuisineMenu(!showCuisineMenu)}>Выбрать кухни</button>
            {showCuisineMenu && (
              <div className="cuisine-menu">
                <label>
                  <input type="checkbox" value="Русская" onChange={() => handleCuisineChange("Русская")} />
                  Русская
                </label>
                <label>
                  <input type="checkbox" value="Итальянская" onChange={() => handleCuisineChange("Итальянская")} />
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
              placeholder="Поиск"
              name="text"
              id="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <label htmlFor="name" className="form__label">
              Поиск
            </label>
          </div>
        </div>
        <div className="sort-by-likes">
          <h3>Сортировать по лайкам:</h3>
          <label>
            <input type="checkbox" checked={sortedByLikes} onChange={() => setSortedByLikes(!sortedByLikes)} />
            По убыванию
          </label>
        </div>
      </div>
      <div className="recipe-cards-container">
        {sortedRecipes.map((recipe) => (
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

export default Recipe;
