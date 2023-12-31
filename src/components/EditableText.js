import React, { useState } from "react";

const EditableText = ({ initialText, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [editId, setEditId] = useState(0);
  const origin = JSON.parse(localStorage.getItem("spending"));

  const updateOrigin = origin.map((item) => {
    return item.id === id ? { ...item, text } : item;
  });
  localStorage.setItem("spending", JSON.stringify(updateOrigin));

  const handleDoubleClick = (id) => {
    setIsEditing(true);
    setEditId(id);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full break-all" onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          className="w-full"
          autoFocus
          type="text"
          value={text}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
      ) : (
        <span className="block w-fit">{text}</span>
      )}
    </div>
  );
};

export default EditableText;
