import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import "../../styles/UserDetails.css";
import axios from "axios";
import Back from "../Back";
import Modal from "../Modal";

function CreateUser() {
  const [state, setState] = useState({
    fields: { company: "accesa", address: {} },
    errors: {},
    open: false,
  });

  const createUser = () => {
    axios
      .post("http://20.71.162.122:8080/users", state.fields)
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
    setState((prevState) => {
      return { ...prevState, open: true };
    });
    console.log("sent user");
  };

  const handleChange = (e) => {
    let fields = state.fields;
    fields[e.target.name] = e.target.value;
    setState((prevState) => {
      return { ...prevState, fields: fields };
    });
  };
  const changeAddress = (e) => {
    let address = state.fields.address;
    address[e.target.name] = e.target.value;
    setState({ ...state, address: address });
    console.log(state.fields);
  };
  return (
    <div>
      <Modal
        isOpen={state.open}
        onClose={(e) =>
          setState((prevState) => {
            return { ...prevState, open: false };
          })
        }
      >
        {" "}
        User was sucesfully created
      </Modal>
      <Card className="user-container">
        <Card.Header>Create new user</Card.Header>
        <Card.Body>
          <form className="user-data" onSubmit={createUser}>
            <h5> ✔️ All fields are required</h5>
            <label>
              First name:
              <input
                type="text"
                name="firstName"
                required
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Last name:
              <input
                type="text"
                name="lastName"
                required
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Username:
              <input
                type="text"
                name="username"
                required
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Date of Birth:
              <input
                type="date"
                name="birthday"
                required
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Job title:
              <input
                type="text"
                name="details"
                required
                onChange={handleChange}
              />
            </label>
            <br />
            <label htmlFor="street">Street: </label>
            <input
              type="text"
              required
              name="street"
              onChange={changeAddress}
            />
            <br />
            <label htmlFor="street_number">Number: </label>
            <input
              required
              type="number"
              name="street_number"
              onChange={changeAddress}
            />{" "}
            <br />
            <label htmlFor="city">City: </label>
            <input
              type="text"
              name="city"
              required
              onChange={changeAddress}
            />{" "}
            <br />
            <label htmlFor="city">Postal: </label>
            <input
              type="text"
              name="postal"
              required
              onChange={changeAddress}
            />
            <br />
            <label htmlFor="country">Country: </label>
            <input
              type="text"
              name="country"
              required
              onChange={changeAddress}
            />
            <br />
            <label htmlFor="county">County: </label>
            <input
              type="text"
              name="county"
              required
              onChange={changeAddress}
            />{" "}
            <br />
            <div className="down">
              <Back />
              <Button variant="success" type="submit" className="margin">
                Create
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
export default CreateUser;
