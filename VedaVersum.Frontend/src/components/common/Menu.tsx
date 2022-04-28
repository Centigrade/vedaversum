import React from "react";

function Menu() {
  return (
    <div className="py-3">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
        <button className="veda-versum-button mx-2">Create new article</button>
        <button className="veda-versum-button mx-2">
          Show my created articles
        </button>
        <button className="veda-versum-button mx-2">
          Show articles I'm assigned to
        </button>
      </nav>

      {/* functionalities for articles */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white p-2">
        <span>Other functionalities:</span>
        <button className="veda-versum-button mx-2">Edit article</button>
        <button className="veda-versum-button mx-2">Delete article</button>
      </nav>
    </div>
  );
}

export default Menu;
