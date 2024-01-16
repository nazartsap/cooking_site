import '../styles/Registration.css';
import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../config';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (token) => {
    // Сохраняем токен в cookie
    document.cookie = `token=${token}; path=/;`;

    // Перенаправляем на нужную страницу, например, профиль
    window.location.href = '/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, formData);
      console.log(response.data);

      // Проверяем, есть ли в ответе свойство "token"
      if (response.data && response.data.token) {
        handleLoginSuccess(response.data.token);
      } else {
        console.error('Login failed: Invalid response');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <div>
      <section className="text-center">
        <div className="background"></div>
        <div className="card">
          <div className="card-r">
            <div className="row_all">
              <div className="reg_card">
                <h2 className="fw-bold">Войти</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-outline">
                    <div className="form__group field">
                      <input
                        type="email"
                        className="form__field"
                        placeholder="Email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                      />
                      <label htmlFor="email" className="form__label">
                        Email
                      </label>
                    </div>
                  </div>
                  <div className="form-outline">
                    <div className="form__group field">
                      <input
                        type="password"
                        className="form__field"
                        placeholder="Пароль"
                        name="password"
                        id="password"
                        onChange={handleChange}
                      />
                      <label htmlFor="password" className="form__label">
                        Пароль
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary">
                    Войти
                  </button>

                  <div className="text-center">
                    <p>войти с помощью:</p>
                    <button type="button" className="btn-link">
                      <i className="facebook"></i>
                    </button>

                    <button type="button" className="btn-link">
                      <i className="google"></i>
                    </button>

                    <button type="button" className="btn-link">
                      <i className="twitter"></i>
                    </button>

                    <button type="button" className="btn-link">
                      <i className="github"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
