import { useState } from "react";
import styled from "styled-components";

function LoginForm() {
  const [formInfos, setFormInfos] = useState({
    pseudo: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormInfos((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = (e) => {
    setErrors([]);
    e.preventDefault();
    Object.keys(formInfos).forEach((data) => {
      if (!formInfos[data])
        setErrors((prevState) => [
          ...prevState,
          `Veillez remplir le champ ${data}`,
        ]);
    });
    if (errors.length > 0) return;
  };

  return (
    <Form>
      <form onSubmit={handleLogin}>
        <div className="errors">
          {errors.map((error, index) => (
            <p className="error" key={index}>
              {error}
            </p>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="pseudo">
            Pseudo <sup>*</sup>
          </label>
          <input
            placeholder="Ex: John Doe"
            className="form-control"
            type="text"
            name="pseudo"
            id="pseudo"
            value={formInfos.pseudo}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password <sup>*</sup>
          </label>
          <input
            placeholder="Password"
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={formInfos.password}
            onChange={handleFormChange}
          />
        </div>
        <div className="btns">
          <button className="btn btn-primary">Connecter</button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .errors {
      display: flex;
      flex-direction: column;
      gap: 3px;

      .error {
        font-size: 12px;
        color: red;
      }
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    label {
      font-size: 14px;
    }

    .form-control {
      padding: 10px;
      background: #e0e0e0;
      border-radius: 5px;
      width: calc(100% - 20px);
    }
  }

  .btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
