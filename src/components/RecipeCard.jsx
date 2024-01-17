import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';
import IngredientList from './IngredientList';

const RecipeCard = ({ id, name, instructions, imageUrl, likes, ingredients }) => {
  const maxDescriptionLength = 50;
  const truncatedDescription = instructions ? instructions.slice(0, maxDescriptionLength) : '';
  
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
          <img className='like-img' src='/assets/like.svg' alt='no' />
          <p>{likes}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
