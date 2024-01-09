import React from 'react';
import '../styles/Registration.css';

const Registration = () => {
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
                        <input type="text" id="" placeholder='Имя' className="form-control" />
                      </div>
                      <div className="form-outline">
                        <input type="text" id="" placeholder='Фамилия' className="form-control" />
                      </div>
                  </div>
                  <div className="form-outline">
                    <input type="email" id="" placeholder='Email' className="form-control" />
                  </div>
                  <div className="form-outline">
                    <input type="password" id="" placeholder='Пароль' className="form-control"/>
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

export default Registration;
