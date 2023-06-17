import React from "react";
import { useParams, Link, Outlet } from "react-router-dom";

import * as Urls from "../utils/urls";

type SurveyLayoutProps = {
  surveyId: string;
  children: React.ReactNode;
};

export function SurveyLayout(props: SurveyLayoutProps) {
  const { surveyId, children } = props;

  const surveyPageUrl = Urls.surveyPage(surveyId);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={surveyPageUrl}>Survey {surveyId}</Link>
          </li>
        </ul>
      </nav>
      <hr />
      {children}
    </div>
  );
}
