import React, { useState } from "react";
import styles from "./Card.module.css";
import axios from "axios";

interface Object {
  id: number;
  name: string;
  model: string;
  title: string;
  year: number;
  price: number;
}

export default function Card({ object }: { object: Object }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedObject, setEditedObject] = useState(object);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedObject((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    axios
      .put(`https://test.tspb.su/test-task/vehicles/${object.id}`, editedObject)
      .then((response) => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteClick = () => {
    axios
      .delete(`https://test.tspb.su/test-task/vehicles/${object.id}`)
      .then((response) => {
        setEditedObject(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    editedObject && (
      <div className={styles.card}>
        <div className="card">
          {isEditing ? (
            <div className={styles.cardBody}>
              <div className="form">
                <label htmlFor={`input-name-${object.id}`}>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id={`input-name-${object.id}`}
                  name="name"
                  value={editedObject.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`input-model-${object.id}`}>Model:</label>
                <input
                  type="text"
                  className="form-control"
                  id={`input-model-${object.id}`}
                  name="model"
                  value={editedObject.model}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`input-year-${object.id}`}>Year:</label>
                <input
                  type="text"
                  className="form-control"
                  id={`input-year-${object.id}`}
                  name="year"
                  value={editedObject.year}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`input-price-${object.id}`}>Price:</label>
                <input
                  type="text"
                  className="form-control"
                  id={`input-price-${object.id}`}
                  name="price"
                  value={editedObject.price}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-success" onClick={handleSaveClick}>
                Save
              </button>
            </div>
          ) : (
            <div className={styles.cardBody}>
              <p>Name: {editedObject.name}</p>
              <p>Model: {editedObject.model}</p>
              <p>Year: {editedObject.year}</p>
              <p>Price: {editedObject.price} $</p>
              <div className="card-action">
                <button
                  className="waves-effect waves-light btn-small"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
                <button
                  className="waves-effect waves-light btn-small red"
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
