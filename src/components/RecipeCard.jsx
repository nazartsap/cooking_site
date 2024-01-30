import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/RecipeCard.css";
import apiUrl from "../config";

const RecipeCard = ({
  id,
  name,
  instructions,
  imageUrl,
  likes,
  ingredients,
  onUpdateFavorites,
  onUpdateLikes,
}) => {
  const maxDescriptionLength = 50;
  const truncatedDescription = instructions
    ? instructions.slice(0, maxDescriptionLength)
    : "";

  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likesCount, setLikes] = useState(likes);

  useEffect(() => {
    const isFavoritedInLocalStorage = localStorage.getItem(`favorited-${id}`);
    setIsFavorited(isFavoritedInLocalStorage === "true");
  }, [id]);

  useEffect(() => {
    const isLikedInLocalStorage = localStorage.getItem(`liked-${id}`);
    setIsLiked(isLikedInLocalStorage === "true");
  }, [id]);

  const handleLikeClick = async () => {
    try {
      const apiUrlEndpoint = isLiked
        ? `${apiUrl}/recipes/${id}/unlike`
        : `${apiUrl}/recipes/${id}/like`;

      const response = await axios({
        method: isLiked ? "put" : "put",
        url: apiUrlEndpoint,
        headers: {
          Authorization: `Bearer ${getStoredAuthToken()}`,
        },
      });

      if (response.status === 200 || response.status === 204) {
        setIsLiked(!isLiked);
        localStorage.setItem(`liked-${id}`, String(!isLiked));
        const updatedLikes = await fetchUpdatedLikes();
        setLikes(updatedLikes.likes);

        // Вызов функции для обновления избранных рецептов
        onUpdateLikes();
      } else {
        console.error("Failed to like recipe");
      }
    } catch (error) {
      console.error("Error while liking recipe:", error);
    }
  };

  const getStoredAuthToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    return token ? token.split("=")[1] : null;
  };

  const handleFavoriteClick = async () => {
    try {
      const apiUrlEndpoint = isFavorited
        ? `${apiUrl}/user/removeFromFavorites/${id}`
        : `${apiUrl}/user/addToFavorites/${id}`;

      const response = await axios({
        method: isFavorited ? "delete" : "put",
        url: apiUrlEndpoint,
        headers: {
          Authorization: `Bearer ${getStoredAuthToken()}`,
        },
      });

      if (response.status === 200 || response.status === 204) {
        setIsFavorited(!isFavorited);
        localStorage.setItem(`favorited-${id}`, String(!isFavorited));

        // Вызов функции для обновления избранных рецептов
        onUpdateFavorites();
      } else {
        console.error("Failed to toggle favorites");
      }
    } catch (error) {
      console.error("Error toggling favorites:", error);
    }
  };

  const fetchUpdatedLikes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/recipes/${id}/likes`);
      return response.data;
    } catch (error) {
      console.error("Error fetching updated likes:", error);
      return { likesCount };
    }
  };

  return (
    <div className="recipe-card">
      <Link to={`/recipes/${id}`} className="link-style">
        <div className="recipe-img-contaner">
          <img className="recipe-img" src={imageUrl} alt={name} />
        </div>
        <h3 className="title-recipe">{name}</h3>
      </Link>
      <div className="recipe-des">
        <p>{truncatedDescription}...</p>
        {ingredients && ingredients.length > 0 && (
          <p>
            Ингредиенты:{" "}
            {ingredients.map((ingredient) => (
              <span key={ingredient._id}>{ingredient.name}, </span>
            ))}
          </p>
        )}
        <div className="like-favorite-block">
          <div className="like-block">
            <button
              className={`like-btn ${isLiked ? "liked" : ""}`}
              onClick={handleLikeClick}
              disabled={!getStoredAuthToken()}
            >
              <img className="like-img" src="/assets/like.svg" alt="no" />
            </button>
            <p className="like-count">{likesCount}</p>
          </div>
          <button
            className={`favorite-btn ${isFavorited ? "favorited" : ""}`}
            onClick={handleFavoriteClick}
            disabled={!getStoredAuthToken()}
          >
            <img className="favorite-img" src="/assets/favorite.svg" alt="no" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
