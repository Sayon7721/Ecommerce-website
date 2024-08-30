import { useEffect } from "react";
import "./main.css";
import "./header_footer.css";
function Login() {
  useEffect(() => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    const showCreateAccountForm = (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
    };

    const showLoginForm = (e) => {
      e.preventDefault();
      loginForm.classList.remove("form--hidden");
      createAccountForm.classList.add("form--hidden");
    };

    const handleLoginSubmit = (e) => {
      e.preventDefault();
      setFormMessage(
        loginForm,
        "error",
        "Invalid username/password combination"
      );
    };

    const setFormMessage = (formElement, type, message) => {
      const messageElement = formElement.querySelector(".form__message");
      messageElement.textContent = message;
      messageElement.classList.remove(
        "form__message--success",
        "form__message--error"
      );
      messageElement.classList.add(`form__message--${type}`);
    };

    const setInputError = (inputElement, message) => {
      inputElement.classList.add("form__input--error");
      inputElement.parentElement.querySelector(
        ".form__input-error-message"
      ).textContent = message;
    };

    const clearInputError = (inputElement) => {
      inputElement.classList.remove("form__input--error");
      inputElement.parentElement.querySelector(
        ".form__input-error-message"
      ).textContent = "";
    };

    document
      .querySelector("#linkCreateAccount")
      .addEventListener("click", showCreateAccountForm);
    document
      .querySelector("#linkLogin")
      .addEventListener("click", showLoginForm);
    loginForm.addEventListener("submit", handleLoginSubmit);

    document.querySelectorAll(".form__input").forEach((inputElement) => {
      inputElement.addEventListener("blur", (e) => {
        if (
          e.target.id === "signupUsername" &&
          e.target.value.length > 0 &&
          e.target.value.length < 10
        ) {
          setInputError(
            inputElement,
            "Phone Number must be at least 10 characters in length"
          );
        }
      });
      inputElement.addEventListener("input", (e) => {
        e.target();
        clearInputError(inputElement);
      });
    });
    return () => {
      document
        .querySelector("#linkCreateAccount")
        .removeEventListener("click", showCreateAccountForm);
      document
        .querySelector("#linkLogin")
        .removeEventListener("click", showLoginForm);
      loginForm.removeEventListener("submit", handleLoginSubmit);

      document.querySelectorAll(".form__input").forEach((inputElement) => {
        inputElement.removeEventListener("blur", (e) => {
          if (
            e.target.id === "signupUsername" &&
            e.target.value.length > 0 &&
            e.target.value.length < 10
          ) {
            setInputError(
              inputElement,
              "Username must be at least 10 characters in length"
            );
          }
        });

        inputElement.removeEventListener("input", clearInputError);
      });
    };
  }, []);

  return (
    <div className="container_login">
      <form className="form" id="login">
        <h1 className="form__title">Login</h1>
        <div className="form__message form__message--error"></div>

        <div className="form__input-group">
          <input
            type="text"
            className="form__input"
            autoFocus
            placeholder="Phone Number"
          />
          <div className="form__input-error-message"></div>
        </div>
        <div className="form__input-group">
          <input
            type="password"
            className="form__input"
            autoFocus
            placeholder="Password"
          />
          <div className="form__input-error-message"></div>
        </div>
        <button className="form__button" type="submit">
          Continue
        </button>
        <p className="form__text">
          <a href="#" className="form__link">
            Forgot your password?
          </a>
        </p>
        <p className="form__text">
          <a className="form__link" href="./" id="linkCreateAccount">
            Dont have an account? Create account
          </a>
        </p>
      </form>
      <form className="form form--hidden" id="createAccount">
        <h1 className="form__title">Create Account</h1>
        <div className="form__message form__message--error"></div>
        <div className="form__input-group">
          <input
            type="text"
            id="signupUsername"
            className="form__input"
            autoFocus
            placeholder="Phone Number"
          />
          <div className="form__input-error-message"></div>
        </div>
        <div className="form__input-group">
          <input
            type="text"
            className="form__input"
            autoFocus
            placeholder="Email Address"
          />
          <div className="form__input-error-message"></div>
        </div>
        <div className="form__input-group">
          <input
            type="password"
            className="form__input"
            autoFocus
            placeholder="Password"
          />
          <div className="form__input-error-message"></div>
        </div>
        <div className="form__input-group">
          <input
            type="password"
            className="form__input"
            autoFocus
            placeholder="Confirm password"
          />
          <div className="form__input-error-message"></div>
        </div>
        <button className="form__button" type="submit">
          Continue
        </button>
        <p className="form__text">
          <a className="form__link" href="./" id="linkLogin">
            Already have an account? Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
export default Login;
