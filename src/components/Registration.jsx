  import '../styles/Registration.css';
  import React, { useState } from 'react';
  import axios from 'axios';

  const Registration = () => {
    const [formData, setFormData] = useState({
      name: '',
      surname: '',
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.type]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://important-cyan-sandals.cyclic.app/auth/signup', {
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          password: formData.password,
        });
    
        console.log(response.data);
        // Handle success, maybe redirect to login or show a success message
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
                  <h2 className="fw-bold mb-5">Регистрация</h2>
                  <form className='reg-form'>
                    <div className="name-sername">
                        <div className="form-outline">
                          <input type="text" id="" placeholder='Имя' className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="form-outline">
                          <input type="text" id="" placeholder='Фамилия' className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="form-outline">
                      <input type="email" id="" placeholder='Email' className="form-control"  onChange={handleChange}/>
                    </div>
                    <div className="form-outline">
                      <input type="password" id="" placeholder='Пароль' className="form-control" onChange={handleChange}/>
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

  export default Registration;
