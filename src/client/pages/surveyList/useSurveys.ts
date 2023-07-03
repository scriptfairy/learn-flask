import React from "react";
import { z } from "zod";

const surveySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Survey = z.infer<typeof surveySchema>;

const surveysSchema = z.array(surveySchema);

export type UseSurveysState =
  | { status: "Idle" }
  | { status: "Error"; error: Error }
  | { status: "Loading" }
  | { status: "Success"; surveys: Survey[] };

export function useSurveys(): UseSurveysState {
  const fetchIsDone = React.useRef(false);
  const [state, setState] = React.useState<UseSurveysState>({ status: "Idle" });

  const fetchSurveys = (): void => {
    setState({ status: "Loading" });

    fetch("/api/surveys")
      .then((result) => {
        if (result.status !== 200) {
          const error = new Error(result.statusText);
          return Promise.reject(error);
        }
        return result.json();
      })
      .then((json) => {
        const surveys = surveysSchema.parse(json);
        setState({ status: "Success", surveys });
      })
      .catch((error) => {
        setState({ status: "Error", error });
      });
  };

  // Effect to make sure we call fetchSurveys() only once
  React.useEffect(() => {
    if (!fetchIsDone.current) {
      fetchIsDone.current = true;
      fetchSurveys();
    }
  }, []);

  return state;
}
