// Mocked lead capture for the prototype.
// Production wiring: replace the console.log with a POST to Fundsmart's CRM /
// Supabase edge function. Validate + sanitise before that point.

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // eslint-disable-next-line no-console
  console.log("\n[lead] new submission:\n", JSON.stringify(payload, null, 2), "\n");

  // Mimic a tiny network latency so the submit button's "Sending…" state
  // is visible during the demo.
  await new Promise((r) => setTimeout(r, 450));

  return Response.json({ ok: true });
}
