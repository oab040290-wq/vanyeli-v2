"use client";
import { useState } from "react";

export default function Home() {
  const [carrito, setCarrito] = useState([]);

  const pagar = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ nombre: "Suero", precio: 349, cantidad: 1 }] })
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Error: " + JSON.stringify(data));
    }
  };

  return (
    <div style={{ padding: 20, background: "#ffe4ec", minHeight: "100vh" }}>
      <h1 style={{ fontWeight: "900", fontSize: 28, textAlign: "center" }}>Vanyeli Shop</h1>
      <div style={{ background: "white", padding: 20, borderRadius: 25, marginTop: 20 }}>
        <h2 style={{ fontWeight: "bold" }}>Suero KORMESIC Aclarante - $349</h2>
        <button onClick={() => setCarrito([{ nombre: "Suero", precio: 349 }])} style={{ background: "black", color: "white", width: "100%", padding: 15, borderRadius: 30, marginTop: 10, fontWeight: "bold" }}>
          AGREGAR AL CARRITO
        </button>
      </div>

      {carrito.length > 0 && (
        <div style={{ position: "fixed", bottom: 15, left: 15, right: 15, background: "black", color: "white", padding: 15, borderRadius: 20 }}>
          <div>{carrito.length} producto - $349 MXN</div>
          <button onClick={pagar} style={{ background: "#2563eb", width: "100%", padding: 12, borderRadius: 20, marginTop: 10, fontWeight: "bold" }}>
            PAGAR CON TARJETA 💳
          </button>
        </div>
      )}
    </div>
  );
}
