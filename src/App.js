import "./spinkit.css";
import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchField, setSearchField] = useState("");
  const [users, setUsers] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => {
        return user.name.toLowerCase().includes(searchField);
      })
    );
  }, [users, searchField]);

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
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
          )
        )
      )
      .then((responses) => {
        setAvatars(responses.map((response) => response.request.responseURL));
      });
  }, [users]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <div className="search-container">
        <input
          className="user-search-box"
          type="search"
          placeholder="Name of user"
          onChange={onSearchChange}
        />
      </div>
      {filteredUsers.length ? (
        <div className="user-profiles-container">
          {filteredUsers.map((user) => (
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
