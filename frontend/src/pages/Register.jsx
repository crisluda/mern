import e from "express";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    paasword2: "",
  });
  const { fullName, email, password, password2 } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="form-control"
              value={fullName}
              onChange={onChange}
              placeholder="Enter full name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={email}
              onChange={onChange}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password2"
              id="password2"
              className="form-control"
              value={password2}
              onChange={onChange}
              placeholder="confirm password"
            />
          </div>
          <div className="form-group">
            <button typeof="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
