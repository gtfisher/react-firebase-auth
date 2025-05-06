// src/ProtectedPage.jsx
import React from "react";

const ProtectedPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Protected Content</h2>
      <p>This content is only available to authenticated users.</p>
    </div>
  );
};

export default ProtectedPage;
