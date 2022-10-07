import { useContext, useState } from "react";
import { Form } from "./LoginForm";
import axios from "axios";
import { registerRoute } from "../utils/apiRoutes";
import appState from "../utils/state";

function SignupForm({ handleError }) {
  const { setLogedIn, setLogedUser } = useContext(appState);
  const [formInfos, setFormInfos] = useState({
    pseudo: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

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
    if (
      formInfos.password &&
      formInfos.password !== formInfos.confirm_password
    ) {
      return setErrors((prevState) => [
        ...prevState,
        "Les mots de passes doivent être les mêmes",
      ]);
    }
    if (formInfos.pseudo && formInfos.password) {
      setSubmitting(true);
      const login = axios({
        method: "post",
        url: registerRoute,
        data: formInfos,
      });

      login
        .then((response) => {
          if (response.data.type === "Error") {
            return setErrors((prevState) => [
              ...prevState,
              response.data.message,
            ]);
          }
          const user = response.data.user;
          localStorage.setItem("user", JSON.stringify(user));
          setLogedUser(user);
          setLogedIn(true);
        })
        .catch((err) => handleError())
        .finally(() => setSubmitting(false));
    }
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
        <div className="form-group">
          <label htmlFor="confirm_password">
            Confirmer le mot de passe <sup>*</sup>
          </label>
          <input
            placeholder="Confirm password"
            type="password"
            name="confirm_password"
            id="confirm_password"
            value={formInfos.confirm_password}
            onChange={handleFormChange}
            className="form-control"
          />
        </div>
        <div className="btns">
          <button className="btn btn-primary">
            {submitting ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </Form>
  );
}

export default SignupForm;
