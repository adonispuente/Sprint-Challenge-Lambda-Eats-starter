import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import pie from "./Pizza.jpg";
import { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const Pic = styled.img`
  height: 300px;
  width: 75%;
  margin: 0 auto;
  border: 10px solid white;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border: 1px solid grey;
`;

const formSchema = yup.object().shape({
  name: yup.string().required("Sorry bucko, name is required"),
  red: yup.boolean().oneOf([true, false], "please agree "),
  garlic: yup.boolean().oneOf([true, false], "please agree "),
  bbq: yup.boolean().oneOf([true, false], "please agree "),
  spinach: yup.boolean().oneOf([true, false], "please agree "),
  instructions: yup.string().required("Sorry bucko, name is required"),
  size: yup.string().oneOf(["Small", "Medium", "Large", "XL"])
});

export default function Pizza() {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [formState, setFormState] = useState({
    name: "",
    size: "",
    red: "",
    garlic: "",
    bbq: "",
    spinach: "",
    instructions: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    red: "",
    garlic: "",
    bbq: "",
    spinach: "",
    instructions: ""
  });

  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data);
        setUser(res.data);
        console.log("good job bucko", post);

        setFormState({
          name: "",
          size: "",
          red: "",
          garlic: "",
          bbq: "",
          spinach: "",
          instructions: ""
        });
      })
      .catch(err => console.log(err.response));
  };

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <Div>
      <Link to={`/`}>
        <nav>Click here to go home!</nav>
      </Link>
      <h2> Build your own Pizza! </h2>
      <Pic src={pie} alt="Picture of pizza"></Pic>
      <form onSubmit={formSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={inputChange}
          />
          {errors.name.length > 0 ? (
            <p className="error">{errors.name}</p>
          ) : null}
        </label>

        <label htmlFor="instructions">
          Special Instructions
          <textarea
            name="instructions"
            value={formState.instructions}
            onChange={inputChange}
          />
        </label>

        <label htmlFor="size">
          <h3> What size pie would you like? </h3>
          <select id="size" name="size" onChange={inputChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="XL">XL</option>
          </select>
        </label>

        <h3> Please select all sauces </h3>
        <label htmlFor="red" className="red">
          <input
            type="checkbox"
            name="red"
            value={formState.red}
            onChange={inputChange}
          />
          Original Red
        </label>

        <label htmlFor="garlic" className="garlic">
          <input
            type="checkbox"
            name="garlic"
            value={formState.garlic}
            onChange={inputChange}
          />
          Garlic Ranch
        </label>

        <label htmlFor="bbq" className="bbq">
          <input
            type="checkbox"
            name="bbq"
            value={formState.bbq}
            onChange={inputChange}
          />
          BBQ Sauce
        </label>
        <label htmlFor="spinach" className="spinach">
          <input
            type="checkbox"
            name="spinach"
            value={formState.spinach}
            onChange={inputChange}
          />
          Spinach Alfredo
        </label>
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <pre>{JSON.stringify(user.name, null, 2)}</pre>
        <button disabled={buttonDisabled} onChange={inputChange}>
          Submit
        </button>
      </form>
    </Div>
  );
}
