import React from "react";
import { Link } from "react-router-dom";

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
        <ul className="flex">
          <li className="mr-6">
            <Link
              className="text-blue-500 hover:text-blue-800"
              to={Urls.homePage()}
            >
              Home
            </Link>
          </li>
          <li className="mr-6">
            <Link
              className="text-blue-500 hover:text-blue-800"
              to={surveyPageUrl}
            >
              Survey {surveyId}
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      {children}
    </div>
  );
}
