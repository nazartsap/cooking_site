import React from 'react';
import '../styles/Registration.css';

const Login = () => {
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
                  <input type="email" id="" className="form-control" />
                  <label className="form-label">
                    Email 
                  </label>
                </div>

                <div className="form-outline">
                  <input type="password" id="" className="form-control"/>
                  <label className="form-label">
                    Пароль
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

export default Login;
