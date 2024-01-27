import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import '../styles/Recipe.css';
import apiUrl from '../config';

const Recipe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/recipes`);
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []); // Пустой массив зависимостей означает, что useEffect будет вызываться только при монтировании компонента

  // Обработчик изменения значения в поле ввода
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Функция для фильтрации рецептов по введенному термину
  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='recipe-container'>
      <h2 className='heder-create-recipes'>Рецепты</h2>
      <div className='input-find-ingredient'>
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Поиск"
            name="text"
            id='text'
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <label htmlFor="name" className="form__label">Поиск</label>
        </div>
      </div>
      <div className="recipe-cards-container">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} id={recipe._id} name={recipe.name} instructions={recipe.instructions} imageUrl={recipe.imageUrl} likes={recipe.likes}/>
        ))}
      </div>
    </div>
  );
};

export default Recipe;
