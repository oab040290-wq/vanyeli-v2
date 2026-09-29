"use client";
import { useState } from "react";

const productos = [
  {
    id: 1,
    nombre: "Suero KORMESIC Aclarante Coreano",
    descripcion: "Coreano original - Quita manchas en 7 días",
    precio: 349,
    precioAnterior: 599,
    ganancia: 284,
    viral: 89,
    emoji: "✨",
    color: "bg-green-500"
  },
  {
    id: 2,
    nombre: "Kit Viral Vanyeli (5 piezas)",
    descripcion: "El más pedido en TikTok MX",
    precio: 299,
    precioAnterior: 450,
    ganancia: 210,
    viral: 95,
    emoji: "🔥",
    color: "bg-green-500"
  },
  {
    id: 3,
    nombre: "Parches Acné Coreanos (24 pzs)",
    descripcion: "Invisible - Seca granos en 1 noche",
    precio: 199,
    precioAnterior: 299,
    ganancia: 120,
    viral: 82,
    emoji: "💖",
    color: "bg-orange-400"
  },
];

export default function Home() {
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(false);

  const agregarAlCarrito = (prod) => {
    const existe = carrito.find(p => p.id === prod.id);
    if (existe) {
      setCarrito(carrito.map(p => p.id === prod.id? {...p, cantidad: p.cantidad + 1} : p));
    } else {
      setCarrito([...carrito, {...prod, cantidad: 1}]);
    }
  };

  const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
  const cantidadTotal = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  const pagarMercadoPago = async () => {
    setCargando(true);
    try {
      const items = carrito.map(p => ({
        nombre: p.nombre,
        precio: p.precio,
        cantidad: p.cantidad
      }));
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error MP: " + JSON.stringify(data));
        setCargando(false);
      }
    } catch (e) {
      alert("Error: " + e.message);
      setCargando(false);
    }
  };

  const pedirWhatsApp = () => {
    const mensaje = `Hola Vanyeli! Quiero pedir: ${carrito.map(p => `${p.nombre} x${p.cantidad}`).join(", ")} - Total: $${total} MXN`;
    window.open(`https://wa.me/525657785920?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-pink-100 p-4 pb-40">
      <h1 className="text-3xl font-black text-center mt-6 mb-2">Productos Virales 🔥</h1>
      <p className="text-center text-gray-500 mb-6">Los más vendidos de TikTok</p>

      <div className="max-w-md mx-auto space-y-5">
        {productos.map((prod) => (
          <div key={prod.id} className="bg-white rounded-[28px] p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-4xl">{prod.emoji}</span>
              <span className={`text-white text-sm font-bold px-4 py-1.5 rounded-full ${prod.color}`}>
                {prod.viral}/100 VIRAL
              </span>
            </div>
            <h2 className="font-black text-xl leading-tight">{prod.nombre}</h2>
            <p className="text-gray-500 text-sm mt-1">{prod.descripcion} • Ganancia: ${prod.ganancia} MXN</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="line-through text-gray-400 text-lg">${prod.precioAnterior}</span>
              <span className="text-pink-600 font-black text-3xl">${prod.precio}</span>
            </div>
            <button onClick={() => agregarAlCarrito(prod)} className="w-full bg-black text-white py-4 rounded-full font-black mt-4">
              AGREGAR AL CARRITO
            </button>
          </div>
        ))}
      </div>

      {carrito.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-black text-white rounded-[24px] p-4 shadow-2xl">
          <div className="flex justify-between mb-3 font-bold">
            <span>{cantidadTotal} productos</span>
            <span>${total} MXN</span>
          </div>
          <button onClick={pagarMercadoPago} disabled={cargando} className="w-full bg-blue-600 text-white py-3.5 rounded-full font-black mb-2">
            {cargando? "CARGANDO..." : `PAGAR CON TARJETA 💳`}
          </button>
          <button onClick={pedirWhatsApp} className="w-full bg-pink-600 text-white py-3.5 rounded-full font-black">
            PEDIR POR WHATSAPP 56 5778 5920
          </button>
        </div>
      )}
    </div>
  );
}
