export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const baseCurrency = searchParams.get("base") || "USD"; 
  const targetCurrency = searchParams.get("target") || "KZT"; 

  try {
    const response = await fetch(
      `https://api.exchangerate.host/live?access_key=896ad2494b71b535747e0760d225a517`
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("Ошибка при получении данных от API");
    }

    return Response.json({ rate: data.info.rate });
  } catch (error) {
    console.error("Ошибка API:", error);
    return Response.json({ results: [] });
  }
}