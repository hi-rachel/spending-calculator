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
    isNaN(event.target.value)
      ? setSpending(0)
      : setSpending(parseInt(event.target.value));
  };

  const handleBlur = () => {
    setIsEditing(false);
    window.location.reload();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      window.location.reload();
    }
  };

  return (
    <>
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
          <span>{spending.toLocaleString()}</span>
        )}
      </div>
    </>
  );
};

export default EditableSpending;
