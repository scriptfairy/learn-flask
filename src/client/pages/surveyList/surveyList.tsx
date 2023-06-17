import React from "react";
import { Link } from "react-router-dom";

export function SurveyList() {
  return (
    <div>
      <h1>Survey List</h1>
      <ul>
        <li>
          <Link to="/survey/abc123">Survey ABC123</Link>
        </li>
        <li>
          <Link to="/survey/xyz879">Survey XYZ789</Link>
        </li>
      </ul>
    </div>
  );
}
