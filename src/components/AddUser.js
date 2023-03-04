import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        gender,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create New Movie</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => navigate("/")}
          ></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={saveUser}>
            <div className="field">
              <label className="label">Movie Name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">ReleaseDate</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">genre</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Female">Drama</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className="button is-success">
                  Save
                </button>
              </div>
              <div className="control">
                <button
                  className="button"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddUser;
