import React from "react";
import { Link } from "react-router-dom";

import { MainLayout } from "../../layouts/mainLayout";
import * as Urls from "../../utils/urls";

export function NotFoundPage() {
  return (
    <MainLayout>
      <h1>Page not found</h1>
      <p>
        <Link to={Urls.homePage()}>Go to the home page</Link>
      </p>
    </MainLayout>
  );
}
