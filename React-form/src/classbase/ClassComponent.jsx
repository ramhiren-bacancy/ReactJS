import React, { Component } from "react";

class ClassComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {},
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => {
      const errors = this.validate();
      this.setState({ errors });
    });
  };

  validate = () => {
    const errors = {};

    if (!this.state.name.trim()) {
      errors.name = "Name is required";
    }

    if (this.state.name.length < 2) {
      errors.name = "Name must length of 2";
    }

    if (!this.state.email.includes("@")) {
      errors.email = "Valid email required";
    }

    if (this.state.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    console.log("data", this.state);
  };

  render() {
    const { name, email, password, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            placeholder="Name"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default ClassComponent;
