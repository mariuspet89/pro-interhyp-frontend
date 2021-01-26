import React, { useState, useEffect } from "react";
import userStyles from "../styles/UserDetails.module.css";
import Button from "react-bootstrap/Button";
import Editable from "./editable";
import { Card } from "react-bootstrap";
import axios from "axios";
import Back from "./Back";
import Modal from "./Modal";

const UserDetails = (props) => {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.location.state.user) {
      setUser(props.location.state.user);
    }
  }, [props.location.state.user]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const changeAddress = (e) => {
    const address = user.address;
    const newAddress = { ...address, [e.target.name]: e.target.value };
    setUser({ ...user, address: newAddress });
  };

  const updateUser = () => {
    console.log(user);
    axios
      .put("http://20.71.162.122:8080/users", user)
      .then((response) => {
        console.log("User updated");
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen({ open: true });
  };

  return (
    <div>
      <Modal isOpen={open} onClose={(e) => setOpen((open) => (open = false))}>
        User was sucesfully updated
      </Modal>
      <Card className={userStyles.userContainer}>
        <Card.Header as="h3">
          {user.firstName} {user.lastName}
        </Card.Header>
        <Card.Body>
          <div className={userStyles.info}>
            ✏️ click on the values you want to modify
          </div>
          <div className={userStyles.userData}>
            <div>
              First Name:
              <Editable
                text={user.firstName}
                placeholder={user.firstName}
                type="input"
                className={userStyles.margin}
              >
                <input
                  type="text"
                  className={userStyles.margin}
                  name="firstName"
                  placeholder={user.firstName}
                  onChange={handleChange}
                />
              </Editable>
            </div>
            <div>
              Last Name:
              <Editable
                text={user.lastName}
                placeholder={user.lastName}
                type="input"
                className={userStyles.margin}
              >
                <input
                  type="text"
                  className={userStyles.margin}
                  name="lastName"
                  placeholder={user.lastName}
                  value={user.lastName}
                  onChange={handleChange}
                />
              </Editable>
            </div>
            <div>
              Username:
              <Editable
                text={user.username}
                placeholder={user.username}
                type="input"
                className={userStyles.margin}
              >
                <input
                  type="text"
                  className={userStyles.margin}
                  name="username"
                  placeholder={user.username}
                  value={user.username}
                  onChange={handleChange}
                />
              </Editable>
            </div>
            <div>
              Date of birth:
              <Editable
                text={user.birthday}
                className={userStyles.margin}
                placeholder={user.birthday}
                type="input"
              >
                <input
                  type="date"
                  className={userStyles.margin}
                  name="birthday"
                  placeholder={user.birthday}
                  value={user.birthday}
                  onChange={handleChange}
                />
              </Editable>
            </div>
            <div>
              Job title:
              <Editable
                text={user.job}
                className={userStyles.margin}
                placeholder={user.details}
                type="input"
              >
                <input
                  type="text"
                  className={userStyles.margin}
                  name="details"
                  placeholder={user.details}
                  value={user.details}
                  onChange={handleChange}
                />
              </Editable>
            </div>
            {user.address && (
              <div>
                <h2>Address :</h2>
                <div className={userStyles.street}>
                  <label htmlFor="street">Street: </label>
                  <input
                    type="text"
                    className={userStyles.address}
                    name="street"
                    value={user.address.street}
                    onChange={changeAddress}
                  />
                  <label htmlFor="street_number">Number: </label>
                  <input
                    id={userStyles.number}
                    type="text"
                    className={userStyles.address}
                    name="street_number"
                    value={user.address?.street_number}
                    onChange={changeAddress}
                  />
                </div>
                <label htmlFor="city">City: </label>
                <input
                  type="text"
                  className={userStyles.address}
                  name="city"
                  value={user.address.city}
                  onChange={changeAddress}
                />
                <label htmlFor="city">Postal: </label>
                <input
                  id={userStyles.postal}
                  type="text"
                  className={userStyles.address}
                  name="postal"
                  value={user.address.postal}
                  onChange={changeAddress}
                />
                <br />
                <label htmlFor="country">Country: </label>
                <input
                  type="text"
                  className={userStyles.address}
                  name="country"
                  value={user.address.country}
                  onChange={changeAddress}
                />
                <br />
                <label htmlFor="county">County: </label>
                <input
                  type="text"
                  className={userStyles.address}
                  name="county"
                  value={user.address.county}
                  onChange={changeAddress}
                />{" "}
                <br />
              </div>
            )}
          </div>
          <div className={userStyles.down}>
            <Back />
            <Button
              variant="success"
              className={userStyles.margin}
              onClick={() => updateUser()}
            >
              Update
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserDetails;
