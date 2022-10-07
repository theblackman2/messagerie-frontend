import { useState } from "react";
import styled from "styled-components";
import Error from "../components/Error";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Auth() {
  const [login, setLogin] = useState(true);
  const [error, setError] = useState(false);

  const handleError = () => setError(true);

  const closeError = () => setError(false);

  return (
    <Container login={login}>
      {error && (
        <div className="error-handle">
          <Error close={closeError} />
        </div>
      )}
      <div className="auth-section">
        <div className="head">
          <h1 className="app-name">To loba</h1>
          <p className="app-description">
            Parler avec des millions de personnes dans le monde, faites-vous des
            connaissances et allez plus loin gratuitement et facilement, masquez
            votre identité si vous ne voulez pas l’afficher.
          </p>
        </div>
        <div className="form-section">
          <div className="switch-section">
            <button
              onClick={() => setLogin(true)}
              className="switch-btn login-btn"
            >
              Connexion
            </button>
            <button
              onClick={() => setLogin(false)}
              className="switch-btn sign-btn"
            >
              Inscription
            </button>
          </div>
          <div className="form">
            {login ? (
              <LoginForm handleError={handleError} />
            ) : (
              <SignupForm handleError={handleError} />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Auth;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;

  .error-handle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .auth-section {
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .head {
      background-color: white;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem;

      .app-description {
        text-align: center;
        font-size: 14px;
        line-height: 1.4em;
      }
    }

    .form-section {
      background-color: white;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;

      .switch-section {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;

        .switch-btn {
          padding: 5px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-btn::after,
        .sign-btn::after {
          content: "";
          width: 100%;
          display: block;
          height: 3px;
          padding: 0 10px;
          margin-top: 5px;
        }

        .login-btn::after {
          background-color: ${({ login }) =>
            login ? "#1966FF" : "transparent"};
        }

        .sign-btn::after {
          background-color: ${({ login }) =>
            !login ? "#1966FF" : "transparent"};
        }
      }

      .form {
        width: 100%;
      }
    }
  }
`;
