import React, { useState } from "react";

const Editable = ({ text, type, placeholder, children, ...props }) => {
  const [isEditing, setEditing] = useState(false);
  const handleKeyDown = (event, type) => {};
  return (
    <span {...props}>
      {isEditing ? (
        <span
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          {children}
        </span>
      ) : (
        <span onClick={() => setEditing(true)}>
          <span>{text || placeholder || "Editable content"}</span>
        </span>
      )}
    </span>
  );
};

export default Editable;
