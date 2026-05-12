import type { Metadata } from "next";
import QuizApp from "./components/QuizApp";

export const metadata: Metadata = {
  title: "Get matched to one lender",
  description:
    "Bank said no to your SME loan? In 2 minutes, we find the 1 lender most likely to say yes. Soft search only. No cowboys.",
};

export default function Page() {
  return <QuizApp />;
}
