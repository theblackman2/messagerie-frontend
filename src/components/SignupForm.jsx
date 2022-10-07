import { useState } from "react";
import { Form } from "./LoginForm";

function SignupForm() {
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
          <button className="btn btn-primary">Enregistrer</button>
        </div>
      </form>
    </Form>
  );
}

export default SignupForm;
