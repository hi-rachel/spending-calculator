import React, { useState } from "react";

const EditableSpending = ({ initialSpending, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [spending, setSpending] = useState(initialSpending);
  const [editId, setEditId] = useState(0);
  const origin = JSON.parse(localStorage.getItem("spending"));

  const updateOrigin = origin.map((item) => {
    return item.id === id ? { ...item, spending } : item;
  });
  localStorage.setItem("spending", JSON.stringify(updateOrigin));

  const handleDoubleClick = (id) => {
    setIsEditing(true);
    setEditId(id);
  };

  const handleChange = (event) => {
    setSpending(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Save the changes or perform any required actions here
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div style={{ display: "inline" }} onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          style={{ width: "auto" }}
          type="number"
          value={spending}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
      ) : (
        <span>{spending}</span>
      )}
    </div>
  );
};

export default EditableSpending;
