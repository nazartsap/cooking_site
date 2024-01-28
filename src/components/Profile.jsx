import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import apiUrl from "../config";
import RecipeCard from "./RecipeCard";
import "../styles/Profile.css";

const ProfilePage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    email: "",
  });

  const getStoredAuthToken = useCallback(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    return token ? token.split("=")[1] : null;
  }, []);

  const updateLocalStorageLikes = (recipeId, isLiked) => {
    const likesKey = `liked-${recipeId}`;
    localStorage.setItem(likesKey, String(isLiked));
  };

  const updateLocalStorageFavorites = (recipeId, isFavorited) => {
    const favoritesKey = `favorited-${recipeId}`;
    localStorage.setItem(favoritesKey, String(isFavorited));
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/;";
    window.location.href = "/";
    localStorage.clear();
  };

  const fetchProfileInfo = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${getStoredAuthToken()}`,
        },
      });

      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }, [getStoredAuthToken]);

  const handleUpdateLikes = async () => {
    try {
      await fetchLikedRecipes();
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleUpdateFavorites = async () => {
    try {
      await fetchFavoriteRecipes();
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const fetchFavoriteRecipes = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/favoriteRecipes`, {
        headers: {
          Authorization: `Bearer ${getStoredAuthToken()}`,
        },
      });

      setFavoriteRecipes(response.data);
      response.data.forEach((recipe) => {
        updateLocalStorageFavorites(recipe._id, true);
      });
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  }, [getStoredAuthToken]);

  const fetchLikedRecipes = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/likedRecipes`, {
        headers: {
          Authorization: `Bearer ${getStoredAuthToken()}`,
        },
      });
  
      setLikedRecipes(response.data.likedRecipeIds || []);
  
      likedRecipes.forEach((recipeId) => {
        updateLocalStorageLikes(recipeId, true);
      });
    } catch (error) {
      console.error("Error fetching liked recipes:", error);
    }
  }, [getStoredAuthToken, likedRecipes]);

  useEffect(() => {
    fetchProfileInfo();
    fetchFavoriteRecipes();
    fetchLikedRecipes();
  }, [fetchProfileInfo, fetchFavoriteRecipes, fetchLikedRecipes]);

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
                  onUpdateFavorites={handleUpdateFavorites}
                  onUpdateLikes={handleUpdateLikes}
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
          <h2>
            {userInfo.name} {userInfo.surname}
          </h2>
          <p>Email: {userInfo.email}</p>
        </div>
        <button className="change-button">Редактировать</button>
        <div className="profile-content">
          <h3>Лайков поставленно</h3>
          <h3>Коментариев оставленно</h3>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
