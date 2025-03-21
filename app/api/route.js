export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  if (!query) return Response.json({ results: [] });

  try {
    const monicaResponse = await fetch(`https://openapi.monica.im/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer sk-Viscjqv07VpvsEWj72qr0QTCLekSlX5WeT3dtYgefW-cppPW7lo2d8Ig3VuNuXXT5g49QmczIJczflThr2BYSbnRcVws_wzvlpZS
`,
      },
      body: JSON.stringify({
        model: "monica:search",
        messages: [{ role: "user", content: query }],
      }),
    });

    const data = await monicaResponse.json();
    return Response.json({ results: data.choices.map((c) => c.message.content) });
  } catch (error) {
    console.error("Ошибка API:", error);
    return Response.json({ results: [] });
  }
}