import React, { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../config";
import RecipeCard from './RecipeCard';
import "../styles/Profile.css";

const ProfilePage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    // Выполняем запрос к эндпоинту для получения избранных рецептов
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/favoriteRecipes`, {
          headers: {
            Authorization: `Bearer ${getStoredAuthToken()}`,
          },
        });

        setFavoriteRecipes(response.data);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  const getStoredAuthToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    return token ? token.split("=")[1] : null;
  };

  return (
    <div className="profile-block">
      <div className="favorite-recipes">
        {favoriteRecipes.length === 0 ? (
          <a>
            Пока здесь ничего нет, но скоро здесь появятся ваши избранные
            рецепты
          </a>
        ) : (
          <div>
            <h2>Избранные рецепты:</h2>
            <div className="recipe-cards-container">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  id={recipe._id}
                  name={recipe.name}
                  instructions={recipe.instructions}
                  imageUrl={recipe.imageUrl}
                  likes={recipe.likes}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="vertical-line"></div>
      <div className="profile-info">
        <div className="profile-header">
          <img
            src="/assets/profile-icon.png"
            alt="Profile"
            className="profile-image"
          />
          <h2>Иван</h2>
          <p>Email: ivan@example.com</p>
        </div>
        <button className="change-button">Редактировать</button>
        <div className="profile-content">
          <h3>Лайков поставленно</h3>
          <h3>Коментариев оставленно</h3>
        </div>

        <button className="logout-button">Выйти</button>
      </div>
    </div>
  );
};

export default ProfilePage;
