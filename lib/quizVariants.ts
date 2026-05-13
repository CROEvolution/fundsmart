export type ModalStepId =
  | "purpose"
  | "urgency"
  | "company"
  | "director"
  | "dob"
  | "turnover"
  | "contact";

export type QuizVariantId = "control" | "v2" | "v3" | "v4";

export type QuizVariant = {
  id: QuizVariantId;
  route: string;
  name: string;
  hypothesis: string;
  heroStepCount: number;
  modalSteps: ModalStepId[];
  stickyCta: string;
  stickySub: string;
};

export const quizVariants: Record<QuizVariantId, QuizVariant> = {
  control: {
    id: "control",
    route: "/quz-001",
    name: "V1 Control, Amount First",
    hypothesis: "Control form: amount first, then deeper qualification in the modal.",
    heroStepCount: 1,
    modalSteps: ["purpose", "company", "director", "dob", "turnover", "contact"],
    stickyCta: "Get matched in 2 minutes",
    stickySub: "Soft search only · no credit impact",
  },
  v2: {
    id: "v2",
    route: "/quz-001/v2",
    name: "V2 Progressive Intent",
    hypothesis:
      "Ask amount, funding reason, and urgency one at a time before the modal.",
    heroStepCount: 3,
    modalSteps: ["turnover", "company", "director", "dob", "contact"],
    stickyCta: "See my Funding Fitness Score",
    stickySub: "Amount · reason · timing before Companies House",
  },
  v3: {
    id: "v3",
    route: "/quz-001/v3",
    name: "V3 Eligibility First",
    hypothesis:
      "Qualify turnover and trading history before sensitive details to raise intent.",
    heroStepCount: 3,
    modalSteps: ["purpose", "urgency", "company", "director", "dob", "contact"],
    stickyCta: "Check my lender fit",
    stickySub: "Turnover-qualified before Companies House",
  },
  v4: {
    id: "v4",
    route: "/quz-001/v4",
    name: "V4 Fast Lead Capture",
    hypothesis:
      "Capture email and phone in the hero, then enrich the lead with qualification details.",
    heroStepCount: 2,
    modalSteps: ["purpose", "turnover", "company", "director", "dob"],
    stickyCta: "Save my lender match",
    stickySub: "Report saved before the longer checks",
  },
};

export const splitTestVariantIds = ["v2", "v3", "v4"] as const;

export function isQuizVariantId(value: string): value is QuizVariantId {
  return value === "control" || value === "v2" || value === "v3" || value === "v4";
}

export function isSplitTestVariantId(
  value: string,
): value is (typeof splitTestVariantIds)[number] {
  return splitTestVariantIds.includes(value as (typeof splitTestVariantIds)[number]);
}
