import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <div className='recipe-img-contaner'>
        <img className='recipe-img' src={recipe.img} alt={recipe.title} />
      </div>
      <h3 className='title-recipe'>{recipe.title}</h3>
      <div className='recipe-des'>
        <p>{recipe.description}</p>
        <div className='like-block'>
        <img className='like-img' src='/assets/like.svg' alt='no' />
        <p>{recipe.like}</p>
        </div>
      </div>
      <Link to={`/recipes/${recipe.id}`}>Подробнее</Link>
    </div>
  );
};
export default RecipeCard;