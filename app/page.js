"use client";
import { useState } from "react";

const productos = [
  { id: 1, nombre: "Suero KORMESIC Aclarante", precio: 349, imagen: "✨" },
  { id: 2, nombre: "Suero JILLON Niacinamida", precio: 329, imagen: "💧" },
  { id: 3, nombre: "Crema COLAGENO Coreana", precio: 299, imagen: "🧴" },
  { id: 4, nombre: "Parches Ojeras Oro 24k", precio: 199, imagen: "👁️" },
];

export default function Home() {
  const [carrito, setCarrito] = useState([]);

  const agregar = (p) => {
    setCarrito([...carrito, { ...p, cantidad: 1 }]);
  };

  const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);

  const pagar = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: carrito })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert("Error: " + JSON.stringify(data));
  };

  return (
    <div style={{ background: "#ffe4ec", minHeight: "100vh", padding: 15, fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", fontWeight: 900, fontSize: 30, marginTop: 10 }}>Vanyeli Shop</h1>
      <p style={{ textAlign: "center", color: "#666" }}>Productos Virales ✨ Envío Gratis</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
        {productos.map((p) => (
          <div key={p.id} style={{ background: "white", borderRadius: 20, padding: 15, textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>{p.imagen}</div>
            <div style={{ fontWeight: "bold", fontSize: 14, marginTop: 8, height: 35 }}>{p.nombre}</div>
            <div style={{ fontWeight: 900, color: "#ec4899", marginTop: 5 }}>${p.precio} MXN</div>
            <button onClick={() => agregar(p)} style={{ background: "black", color: "white", width: "100%", padding: 10, borderRadius: 20, marginTop: 10, fontWeight: "bold", border: "none" }}>
              AGREGAR
            </button>
          </div>
        ))}
      </div>

      {carrito.length > 0 && (
        <div style={{ position: "fixed", bottom: 10, left: 10, right: 10, background: "black", color: "white", padding: 15, borderRadius: 20, zIndex: 100 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
            <span>{carrito.length} productos</span>
            <span>${total} MXN</span>
          </div>
          <button onClick={pagar} style={{ background: "#2563eb", color: "white", width: "100%", padding: 14, borderRadius: 15, marginTop: 10, fontWeight: 900, border: "none" }}>
            PAGAR CON TARJETA 💳
          </button>
        </div>
      )}
    </div>
  );
}
