import '../styles/Registration.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../config';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
      });
       
      console.log(formData)
      console.log(response.data);
      // Handle success, maybe redirect to login or show a success message
      navigate(`/verify/${formData.email}`);
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
      // Handle error, show an error message to the user
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
                <h2 className="fw-bold">Регистрация</h2>
                <form className='reg-form'>
                  <div className="name-sername">
                    <div className="form-outline">
                      <div className="form__group field">
                      <input type="text" className="form__field" placeholder="Имя" name="name" id='name' onChange={handleChange} />
                        <label for="name" className="form__label">Имя</label>
                      </div>
                    </div>
                    <div className="form-outline">
                      <div className="form__group field">
                      <input type="text" className="form__field" placeholder="Фамилия" name="surname" id='surname' onChange={handleChange} />
                        <label for="surname" className="form__label">Фамилия</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-outline">
                    <div className="form__group field">
                    <input type="email" className="form__field" placeholder="Email" name="email" id='email' onChange={handleChange} />
                      <label for="email" className="form__label">Email</label>
                    </div>
                  </div>
                  <div className="form-outline">
                    <div className="form__group field">
                    <input type="password" className="form__field" placeholder="Пароль" name="password" id='password' onChange={handleChange} />
                      <label for="password" className="form__label">Пароль</label>
                    </div>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                      defaultChecked
                    />
                    <label className="form-check-label">
                      Получать уведомления об обновлениях
                    </label>
                  </div>

                  <button type="submit" className="btn-primary" onClick={handleSubmit} cur>
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

export default Registration;
