import { NextResponse } from 'next/server';
export async function POST(req) {
  try {
    const { items } = await req.json();
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
    const preference = {
      items: items.map(i => ({
        title: i.nombre,
        quantity: i.cantidad,
        unit_price: Number(i.precio),
        currency_id: "MXN"
      })),
      back_urls: {
        success: "https://www.vanyeli.com.mx",
        failure: "https://www.vanyeli.com.mx",
        pending: "https://www.vanyeli.com.mx"
      },
      auto_return: "approved"
    };
    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(preference)
    });
    const data = await res.json();
    return NextResponse.json({ url: data.init_point });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
