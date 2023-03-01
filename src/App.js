import "./spinkit.css";
import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    axios
      .all(
        users.map((user) =>
          axios.get(
            `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`
          )
        )
      )
      .then((responses) => {
        setAvatars(responses.map((response) => response.request.responseURL));
      });
  }, [users]);

  return (
    <div className="App">
      {users.length ? (
        <div className="user-profiles-container">
          {users.map((user) => (
            <div className="user-profile" key={user.id}>
              <img src={avatars[user.id - 1]} alt={`${user.name}'s avatar`} />
              <div className="user-details">
                <h2>{user.name}</h2>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Company:</strong> {user.company.name}
                </p>
                <p>
                  <strong>Website:</strong> {user.website}
                </p>
                <p>
                  <strong>Address:</strong> {user.address.street},{" "}
                  {user.address.suite}, {user.address.city},{" "}
                  {user.address.zipcode}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      )}
    </div>
  );
}

export default App;
