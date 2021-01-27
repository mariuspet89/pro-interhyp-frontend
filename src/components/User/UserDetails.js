import React, { useState, useEffect } from "react";
import "../../styles/UserDetails.css";
import Button from "react-bootstrap/Button";
import Editable from "./editable";
import { Card } from "react-bootstrap";
import axios from "axios";
import Back from "../Back";
import Modal from "../Modal";
import Address from "./Address";

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
      <Card className="user-container">
        <Card.Header as="h3">
          {user.firstName} {user.lastName}
        </Card.Header>
        <Card.Body>
          <div className="info">✏️ click on the values you want to modify</div>
          <div className="user-data">
            <div>
              First Name:
              <Editable
                text={user.firstName}
                placeholder={user.firstName}
                type="input"
                className="margin"
              >
                <input
                  type="text"
                  className="margin"
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
                className="margin"
              >
                <input
                  type="text"
                  className="margin"
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
                className="margin"
              >
                <input
                  type="text"
                  className="margin"
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
                className="margin"
                placeholder={user.birthday}
                type="input"
              >
                <input
                  type="date"
                  className="margin"
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
                className="margin"
                placeholder={user.details}
                type="input"
              >
                <input
                  type="text"
                  className="margin"
                  name="details"
                  placeholder={user.details}
                  value={user.details}
                  onChange={handleChange}
                />
              </Editable>
            </div>
            {user.address && (
              <Address user={user} changeAddress={changeAddress} />
            )}
          </div>
          <div className="down">
            <Back />
            <Button
              variant="success"
              className="margin"
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
