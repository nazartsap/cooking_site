import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../config';

const VerificationCode = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const { email } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/verify`, {
        email: email,
        verificationCode,
      });

      console.log(response); // выводим весь объект ответа

      // Проверяем статус ответа
      if (response.status === 201) {
        console.log(response.data.message);
        // Обрабатываем успешный результат, например, перенаправляем на страницу входа
        navigate('/login');
      } else {
        console.error('Verification failed: Invalid response');
      }
    } catch (error) {
      console.error('Verification failed:', error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <div>
      <h2>Enter Verification Code</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-outline">
          <div className="form__group field">
            <input
              type="text"
              className="form__field"
              placeholder="Verification Code"
              name="verificationCode"
              id="verificationCode"
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <label htmlFor="verificationCode" className="form__label">
              Verification Code
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerificationCode;
