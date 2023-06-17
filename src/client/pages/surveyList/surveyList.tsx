import React from "react";
import { Link } from "react-router-dom";

import { MainLayout } from "../../layouts/mainLayout";
import * as Urls from "../../utils/urls";

export function SurveyListPage() {
  return (
    <MainLayout>
      <h1>Survey List</h1>
      <ul>
        <li>
          <Link to={Urls.surveyPage("abc123")}>Survey ABC123</Link>
        </li>
        <li>
          <Link to={Urls.surveyPage("xyz456")}>Survey XYZ789</Link>
        </li>
      </ul>
    </MainLayout>
  );
}
