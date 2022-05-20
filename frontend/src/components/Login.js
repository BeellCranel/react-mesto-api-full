import React, { useState } from "react";

function Login({ handleLogin }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userData;

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin(email, password);
  }

  return (
    <main className="content">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit} name="login">
          <h2 className="form__title form__title_theme_dark">Вход</h2>
          <fieldset className="form__fieldset">
            <label className="form__field">
              <input
                className="form__input form__input_theme_dark"
                id="login-email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <span className="form__error" id="login-email-error"></span>
            </label>
            <label className="form__field">
              <input
                className="form__input form__input_theme_dark"
                id="login-password"
                type="text"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Пароль"
                minLength="6"
                maxLength="20"
                required
              />
              <span className="form__error" id="login-password-error"></span>
            </label>
          </fieldset>
          <input
            className="form__submit form__submit_theme_dark"
            type="submit"
            name="submit"
            value="Войти"
          />
        </form>
      </div>
    </main>
  );
}

export default Login;
