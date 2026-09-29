export default function Admin() {
  const ganancia = 349 - 18 - 35 - 12;
  return (
    <div style={{background:'black', color:'white', minHeight:'100vh', padding:'20px'}}>
      <h1 style={{color:'#f472b6', fontSize:'28px', fontWeight:'900'}}>VANYELI V2 - PANEL NEGOCIO REAL</h1>
      <p style={{color:'gray'}}>México • MXN • Tecámac • WhatsApp 56 5778 5920</p>
      <div style={{background:'#18181b', padding:'15px', borderRadius:'12px', marginTop:'20px', border:'1px solid #db2777'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}><b>Suero KORMESIC Coreano</b><span style={{background:'green', padding:'5px 10px', borderRadius:'20px', fontSize:'12px'}}>89/100 VIRAL</span></div>
        <p style={{fontSize:'12px', marginTop:'10px'}}>Costo: $18 + Envío: $35 → Venta: $349 = Ganancia: ${ganancia} MXN</p>
        <p style={{fontSize:'12px', color:'#f9a8d4', marginTop:'5px'}}>✓ VIRAL DETECTADO - Publicar</p>
      </div>
      <p style={{marginTop:'20px', fontSize:'12px', color:'gray'}}>✓ Etapa 1 Catálogo ✓ Etapa 2 Detector ✓ Etapa 3 Publicación ✓ Etapa 4 Mercado Pago ✓ Etapa 5 Envia ✓ Etapa 6 Ganancias</p>
    </div>
  );
}
