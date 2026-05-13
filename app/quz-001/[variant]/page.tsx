import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizApp from "../components/QuizApp";
import {
  isSplitTestVariantId,
  quizVariants,
  splitTestVariantIds,
} from "@/lib/quizVariants";

type Props = {
  params: Promise<{ variant: string }>;
};

export function generateStaticParams() {
  return splitTestVariantIds.map((variant) => ({ variant }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { variant } = await params;
  if (!isSplitTestVariantId(variant)) return {};
  const cfg = quizVariants[variant];
  return {
    title: `${cfg.name} | Fundsmart AI`,
    description:
      "Bank said no to your SME loan? Check your lender fit in 2 minutes. Soft search only. Your data is never sold.",
  };
}

export default async function Page({ params }: Props) {
  const { variant } = await params;
  if (!isSplitTestVariantId(variant)) notFound();
  return <QuizApp variant={variant} />;
}
