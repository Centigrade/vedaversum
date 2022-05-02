import React from "react";

function Menu() {

  return (
    <div className="py-3">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
        <button className="veda-versum-button mx-2">Create new article</button>
        <button className="veda-versum-button mx-2">Edit article</button>
        <button className="veda-versum-button mx-2">Delete article</button>
        <button className="veda-versum-button mx-2">Assign article</button>
      </nav>
    </div>
  );
}

export default Menu;
