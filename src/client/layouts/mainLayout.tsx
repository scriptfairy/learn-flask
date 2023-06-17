import React from "react";
import { Link } from "react-router-dom";

export function MainLayout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </div>
  );
}
