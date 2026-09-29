"use client";
import { useState } from "react";

export default function Home() {
  const [carrito, setCarrito] = useState([]);

  const pagar = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: carrito })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div style={{ padding: 20, background: "#ffe4ec", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", fontWeight: 900 }}>Vanyeli Shop</h1>
      <div style={{ background: "white", padding: 20, borderRadius: 20, marginTop: 20 }}>
        <b>Suero KORMESIC - $349</b>
        <button onClick={() => setCarrito([{ nombre: "Suero", precio: 349, cantidad: 1 }])} style={{ width: "100%", background: "black", color: "white", padding: 12, borderRadius: 20, marginTop: 10 }}>
          AGREGAR AL CARRITO
        </button>
      </div>
      {carrito.length > 0 && (
        <div style={{ position: "fixed", bottom: 10, left: 10, right: 10, background: "black", color: "white", padding: 15, borderRadius: 15 }}>
          <button onClick={pagar} style={{ width: "100%", background: "#2563eb", padding: 12, borderRadius: 20, color: "white", fontWeight: "bold" }}>
            PAGAR CON TARJETA $349
          </button>
        </div>
      )}
    </div>
  );
}
