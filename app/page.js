"use client"
import { useState, useEffect } from "react";
const productos = [
  {id:1, nombre:"Suero KORMESIC Aclarante Coreano", precio:349, antes:599, ganancia:284, viral:89, emoji:"✨", desc:"Coreano original - Quita manchas en 7 días"},
  {id:2, nombre:"Kit Viral Vanyeli (5 piezas)", precio:299, antes:450, ganancia:210, viral:95, emoji:"🔥", desc:"El más pedido en TikTok MX"},
  {id:3, nombre:"Parches Acné Coreanos", precio:199, antes:299, ganancia:140, viral:82, emoji:"💖", desc:"Invisible - Resultados en 6hrs"},
];
export default function Tienda() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(()=>{setTotal(cart.reduce((s,p)=>s+p.precio*p.qty,0))},[cart]);
  const add = (p) => { setCart(prev=>{ const e = prev.find(x=>x.id===p.id); return e? prev.map(x=>x.id===p.id?{...x, qty:x.qty+1}:x) : [...prev, {...p, qty:1}]; }); };
  const checkout = () => { const det = cart.map(p=>`• ${p.nombre} x${p.qty} = $${p.precio*p.qty}`).join('%0A'); const msg = `Hola Vanyeli! 💖 Quiero:%0A%0A${det}%0A%0ATotal: $${total} MXN%0A%0ANombre:%0ADireccion Tecamac:%0A`; window.open(`https://wa.me/525657785920?text=${msg}`, '_blank'); };
  return (
    <div style={{minHeight:'100vh', background:'#fff0f6', paddingBottom:'100px', fontFamily:'sans-serif'}}>
      <div style={{background:'black', color:'white', padding:'15px', textAlign:'center'}}>
        <h1 style={{margin:0, color:'#ff69b4', fontWeight:'900', fontSize:'24px'}}>VANYELI.COM.MX</h1>
        <p style={{margin:0, fontSize:'11px'}}>Envío 24hrs desde Tecámac • Pago Mercado Pago</p>
      </div>
      <div style={{padding:'15px', maxWidth:'450px', margin:'0 auto'}}>
        <h2 style={{fontWeight:'900'}}>Productos Virales 🔥</h2>
        {productos.map(p=>(
          <div key={p.id} style={{background:'white', borderRadius:'20px', padding:'15px', marginTop:'15px', boxShadow:'0 4px 20px rgba(0,0,0,0.1)'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:'30px'}}>{p.emoji}</span><span style={{background:p.viral>85?'#22c55e':'#f59e0b', color:'white', padding:'5px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold'}}>{p.viral}/100 VIRAL</span></div>
            <h3 style={{margin:'10px 0 5px 0', fontWeight:'bold'}}>{p.nombre}</h3>
            <p style={{fontSize:'12px', color:'gray', margin:0}}>{p.desc} • Ganancia: ${p.ganancia} MXN</p>
            <div style={{display:'flex', gap:'10px', alignItems:'center', marginTop:'10px'}}><span style={{textDecoration:'line-through', color:'gray'}}>${p.antes}</span><span style={{fontSize:'22px', fontWeight:'900', color:'#db2777'}}>${p.precio}</span></div>
            <button onClick={()=>add(p)} style={{width:'100%', background:'black', color:'white', padding:'14px', borderRadius:'30px', border:'none', fontWeight:'bold', marginTop:'12px'}}>AGREGAR AL CARRITO</button>
          </div>
        ))}
      </div>
      {cart.length>0 && (<div style={{position:'fixed', bottom:'10px', left:'10px', right:'10px', background:'black', color:'white', borderRadius:'20px', padding:'15px', maxWidth:'450px', margin:'0 auto', zIndex:999}}><div style={{display:'flex', justifyContent:'space-between', fontWeight:'bold'}}><span>{cart.length} productos</span><span>${total} MXN</span></div><button onClick={checkout} style={{width:'100%', background:'#db2777', color:'white', padding:'14px', borderRadius:'15px', border:'none', fontWeight:'900', marginTop:'10px'}}>PEDIR POR WHATSAPP 56 5778 5920</button></div>)}
    </div>
  );
}
