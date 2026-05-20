import type { Metadata } from "next";
import Advertorial from "./components/Advertorial";

export const metadata: Metadata = {
  title:
    "A £3 Billion Government Fund Is Quietly Funding the SMEs Banks Refuse to Lend To",
  description:
    "After 2008, banks were forced to hoard capital. The Treasury's answer, fifteen years later, is a government-backed scheme that pays lenders to say yes to the businesses Barclays says no to.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Advertorial />;
}
