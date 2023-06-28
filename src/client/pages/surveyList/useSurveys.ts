import { useQuery } from "react-query";
import { z } from "zod";

const surveySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Survey = z.infer<typeof surveySchema>;

const surveysSchema = z.array(surveySchema);

const fetchSurveys = async (): Promise<Survey[]> => {
  const res = await fetch("/api/surveys");
  const data = await res.json();
  const surveys = surveysSchema.parse(data);
  return surveys;
};

export type UseSurveysResult =
  | { status: "Idle" }
  | { status: "Error" }
  | { status: "Loading" }
  | { status: "Success"; surveys: Survey[] };

export function useSurveys(): UseSurveysResult {
  const { data, status } = useQuery("fetchSurveys", fetchSurveys);
  switch (status) {
    case "idle": {
      return { status: "Idle" };
    }
    case "loading": {
      return { status: "Loading" };
    }
    case "error": {
      return { status: "Error" };
    }
    case "success": {
      if (data) {
        return { status: "Success", surveys: data };
      }
      return { status: "Error" };
    }
  }
}
