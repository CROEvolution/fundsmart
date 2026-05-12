import { redirect } from "next/navigation";

// Root index. Future home/marketing page lives here. For now we send
// visitors straight to the first live landing page.
export default function RootIndex(): never {
  redirect("/quz-001");
}
