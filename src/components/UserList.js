import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import WB from "../images/WB.png";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [searchTerm]);

  const getUsers = async (searchTerm = "") => {
    const response = await axios.get(
      `http://localhost:5000/users?searchTerm=${searchTerm}`
    );
    setUsers(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers(searchTerm);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand">
          <img src={WB} alt="Movie Logo" style={{height:'50px',width:'50px'}}/>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <span className="icon is-left">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <Link to="add" className="button is-success">
                Create Movie
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="columns mt-5">
        <div className="container">
          <table className="table is-striped is-fullwidth mt-2">
            <thead>
              <tr>
                <th>No</th>
                <th>Movie Name</th>
                <th>Release Date</th>
                <th>Genre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <Link
                      to={`edit/${user._id}`}
                      className="button is-info is-small mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="button is-danger is-small"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserList;
