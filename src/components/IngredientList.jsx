import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import axios from 'axios';
import '../styles/Home.css';

const Ingredient = ({ name, onSelect }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'INGREDIENT',
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className='ingredient-item'
      onClick={() => onSelect(name)}
      ref={drag}
      style={{
        display: 'flex',
        justifyContent: 'center',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        marginBottom: '8px',
        border: '1px solid #000',
        padding: '8px',
        borderRadius: '20px',
        backgroundColor: '#acc4cc',
      }}
    >
      {name}
    </div>
  );
};

const IngredientList = ({ onSelect }) => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleIngredients, setVisibleIngredients] = useState(20);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('https://important-cyan-sandals.cyclic.app/ingredients');
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

return (
  <div className='ingredient-block'>
    <h2 className='hader'>Ингредиенты</h2>
    <div className='input-find-ingredient'>
      <div className="form__group field">
        <input
          type="text"
          class="form__field"
          placeholder="Поиск "
          name="text"
          id='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
        <label for="name" className="form__label">Поиск </label>
      </div>
    </div>
    <div className='ingredient-list'>
      {filteredIngredients.map((ingredient) => (
        <Ingredient key={ingredient._id} name={ingredient.name} onSelect={onSelect} />
      ))}
    </div>
    {visibleIngredients < ingredients.length && (
      <button onClick={showMoreIngredients}>Показать еще</button>
    )}
  </div>
);
};

export default IngredientList;
