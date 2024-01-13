import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';

const RecipeCard = ({ id, name, instructions, imageUrl, likes }) => {
  const maxDescriptionLength = 50;
  const truncatedDescription = instructions ? instructions.slice(0, maxDescriptionLength) : '';
  return (
    <div className="recipe-card">
      <div className='recipe-img-contaner'>
        <img className='recipe-img' src={imageUrl} alt={name} />
      </div>
      <h3 className='title-recipe'>{name}</h3>
      <div className='recipe-des'>
      <p>{truncatedDescription}...</p>
        <div className='like-block'>
        <img className='like-img' src='/assets/like.svg' alt='no' />
        <p>{likes}</p>
        </div>
      </div>
      <Link to={`/recipes/${id}`}>Подробнее</Link>
    </div>
  );
};
export default RecipeCard;