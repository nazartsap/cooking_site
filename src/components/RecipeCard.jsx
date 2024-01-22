import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Добавлен импорт Axios
import '../styles/RecipeCard.css';
import apiUrl from '../config';
import IngredientList from './IngredientList';

const RecipeCard = ({ id, name, instructions, imageUrl, likes, ingredients }) => {
  const maxDescriptionLength = 50;
  const truncatedDescription = instructions ? instructions.slice(0, maxDescriptionLength) : '';

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikes] = useState(likes);

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(`${apiUrl}/recipes/${id}/like`);

      if (response.status === 201) {
        setIsLiked(!isLiked);
        // Получаем обновленное количество лайков после успешного лайка
        const updatedLikes = await fetchUpdatedLikes();
        setLikes(updatedLikes.likes); // Исправлено здесь
      } else {
        console.error('Failed to like recipe');
      }
    } catch (error) {
      console.error('Error while liking recipe:', error);
    }
  };

  const fetchUpdatedLikes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/recipes/${id}/likes`);
      return response.data; // Возвращаем объект, содержащий лайки
    } catch (error) {
      console.error('Error fetching updated likes:', error);
      return { likesCount }; // Возвращаем объект с текущим количеством лайков в случае ошибки
    }
  };

  return (
    <div className="recipe-card">
      <Link to={`/recipes/${id}`} className="link-style">
        <div className='recipe-img-contaner'>
          <img className='recipe-img' src={imageUrl} alt={name} />
        </div>
        <h3 className='title-recipe'>{name}</h3>
      </Link>
      <div className='recipe-des'>
        <p>{truncatedDescription}...</p>
        <p>{ingredients}</p>
        <div className='like-block'>
          <button className={`like-btn ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
            <img className='like-img' src='/assets/like.svg' alt='no' />
          </button>
          <p className='like-count'>{likesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
