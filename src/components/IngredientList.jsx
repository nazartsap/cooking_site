import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import axios from 'axios';
import '../styles/Home.css';
import apiUrl from '../config';

const Ingredient = ({ id, name, onSelect, onRemove }) => {
  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      onSelect(id, name);
    } else {
      onRemove(id);
    }
  };

  return (
    <div className='ingredient-item'>
      {name}
      <input  className='checkbox' type="checkbox" onChange={handleCheckboxChange} />
    </div>
  );
};

const IngredientList = ({ onSelect, onRemove }) => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleIngredients, setVisibleIngredients] = useState(20);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`${apiUrl}/ingredients`);
        setIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const filteredIngredients = ingredients
    .filter((ingredient) => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, visibleIngredients);

  const showMoreIngredients = () => {
    setVisibleIngredients((prevVisibleIngredients) => prevVisibleIngredients + 20);
  };

  return (
    <div className='ingredient-block'>
      <h2 className='hader'>Ингредиенты</h2>
      <div className='input-find-ingredient'>
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Поиск "
            name="text"
            id='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
          <label htmlFor="name" className="form__label">Поиск </label>
        </div>
      </div>
      <div className='ingredient-list'>
        {filteredIngredients.map((ingredient) => (
          <Ingredient key={ingredient._id} id={ingredient._id} name={ingredient.name} onSelect={onSelect} onRemove={onRemove} />
        ))}
      </div>
      <div className='stratch'></div>
      {visibleIngredients < ingredients.length && (
        <div className='btn-show_more-conteiner'> 
          <button className='btn-show_more' onClick={showMoreIngredients}>Показать еще</button> 
        </div>
      )}
    </div>
  );
};

export default IngredientList;
