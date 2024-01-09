import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';
const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <div className='recipe-img-contaner'>
      <img className='recipe-img' src={recipe.img} alt={recipe.title} />
      </div>
      <div className='recipe-des'>
      <p>{recipe.description}</p>
      <p>Рейтинг: {recipe.rating}</p>
      </div>
      <Link to={`/recipes/${recipe.id}`}>Подробнее</Link>
    </div>
  );
};
export default RecipeCard;