import React from "react";

export default function Address({ user, changeAddress }) {
  return (
    <div>
      <h2>Address :</h2>
      <div className="street">
        <label htmlFor="street">Street: </label>
        <input
          type="text"
          className="address"
          name="street"
          value={user.address.street}
          onChange={changeAddress}
        />
        <label htmlFor="street_number">Number: </label>
        <input
          id="number"
          type="text"
          className="address"
          name="street_number"
          value={user.address?.street_number}
          onChange={changeAddress}
        />
      </div>
      <label htmlFor="city">City: </label>
      <input
        type="text"
        className="address"
        name="city"
        value={user.address.city}
        onChange={changeAddress}
      />
      <label htmlFor="city">Postal: </label>
      <input
        id="postal"
        type="text"
        className="address"
        name="postal"
        value={user.address.postal}
        onChange={changeAddress}
      />
      <br />
      <label htmlFor="country">Country: </label>
      <input
        type="text"
        className="address"
        name="country"
        value={user.address.country}
        onChange={changeAddress}
      />
      <br />
      <label htmlFor="county">County: </label>
      <input
        type="text"
        className="address"
        name="county"
        value={user.address.county}
        onChange={changeAddress}
      />{" "}
      <br />
    </div>
  );
}
