import '../styles/Registration.css';
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      console.log(response.data);
      // Handle success, maybe store the token in local storage or redirect to a dashboard
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
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
              <h2 className="fw-bold mb-5">Войти</h2>
              <form>
                <div className="form-outline">
                  <input type="email" id="" className="form-control" onChange={handleChange} />
                  <label className="form-label">
                    Email 
                  </label>
                </div>

                <div className="form-outline">
                  <input type="password" id="" className="form-control"  onChange={handleChange}/>
                  <label className="form-label">
                    Пароль
                  </label>
                </div>
                
                <button type="submit" className="btn-primary" onClick={handleSubmit}>
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
