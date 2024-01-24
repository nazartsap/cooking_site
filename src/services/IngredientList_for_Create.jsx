import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import axios from 'axios';
import '../styles/IngredientList_for_Create.css';
import apiUrl from '../config';

const Ingredient = ({ id, name, onSelect}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'INGREDIENT',
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className='ingredient-item'
      onClick={() => onSelect(id, name)}
      ref={drag}
      style={{
        display: 'flex',
        justifyContent: 'center',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        marginBottom: '8px',
        border: '1px solid #000',
        padding: '8px',
        borderRadius: '11px',
        backgroundColor: '#acc4cc',
        gap: '2px',
      }}
      >
        {name}
      </div>
    );
  };

const IngredientList = ({ onSelect,onIngredientRemove, selectedIngredients }) => {
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
  .slice(0, visibleIngredients); // Используйте slice для отображения только нужного количества ингредиентов

const showMoreIngredients = () => {
  setVisibleIngredients((prevVisibleIngredients) => prevVisibleIngredients + 20);
};
const handleIngredientRemove = (ingredientId) => {
    onIngredientRemove(ingredientId);
  };

return (
  <div className='ingredient-block-for'>
    <h2 className='heder-create-recipes'>Ингредиенты</h2>
    <div className='input-find-ingredient-for'>
    <ul className='selected-ingredients-container-for'>
        {selectedIngredients.map((ingredient) => (
          <li key={ingredient.id} onClick={() => handleIngredientRemove(ingredient.id)}>
            {ingredient.name}
          </li>
        ))}
      </ul>
      <div className='from_fild'>
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
    </div>
    <div className='ingredient-list'>
      {filteredIngredients.map((ingredient) => (
        <Ingredient key={ingredient._id} id={ingredient._id} name={ingredient.name} onSelect={onSelect} />
      ))}
    </div>
    <div className='stratch'></div>
    {visibleIngredients < ingredients.length && (
      <button className='btn-show_more' onClick={showMoreIngredients}>Показать еще</button>
    )}
  </div>
);
};

export default IngredientList;
