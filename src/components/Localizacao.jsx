import React from 'react';
import { Map, MapMarker, MarkerContent } from './ui/map';

export default function Localizacao() {
  const [isMapActive, setIsMapActive] = React.useState(false);

  return (
    <section id="localizacao" className="py-24 px-6 md:px-12 w-full bg-transparent relative overflow-hidden flex flex-col items-center justify-center z-10">
      {/* Upper transition shadow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0D0D12] to-transparent z-10 pointer-events-none" />
      
      {/* Glow Effects */}
      <div className="absolute inset-0 bg-[#FE1616] opacity-[0.03] filter blur-[150px] rounded-full pointer-events-none w-[80%] h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative text-center z-20 mb-16 max-w-2xl mx-auto flex flex-col items-center">
        <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Como Chegar</span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-zinc-200 uppercase mb-6 leading-tight">
          Nossa <span className="font-drama italic text-primary">Localização</span>
        </h2>
        <p className="text-zinc-200 font-light leading-relaxed text-lg md:text-xl">
          Estamos localizados no coração de Goiânia, com estacionamento privativo e fácil acesso para você focar apenas no seu treino.
        </p>
        <p className="text-zinc-200 text-xs mt-3 tracking-wide uppercase">Goiânia — GO</p>
      </div>

      <div className="relative z-20 flex flex-col items-center w-full max-w-4xl">
        {/* Glow behind the map */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none z-0" />
        
        {/* Map Component Container */}
        <div className="relative z-10 w-full max-w-4xl rounded-[40px] border border-white/5 overflow-hidden shadow-[0_0_50px_rgba(254,22,22,0.05)] h-[400px] mb-12 flex justify-center bg-transparent group/map">
          
          <Map
            center={[-49.1832, -16.6565]}
            zoom={15}
            scrollZoom={isMapActive}
            dragPan={isMapActive}
            dragRotate={isMapActive}
            touchZoomRotate={isMapActive}
            mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          >
            <MapMarker longitude={-49.1832} latitude={-16.6565}>
              <MarkerContent>
                 <div className="relative h-8 w-8 rounded-full border-2 border-[#FE1616] bg-primary/20 flex flex-col items-center justify-center animate-pulse shadow-[0_0_30px_rgba(254,22,22,0.8)] backdrop-blur-md">
                    <div className="h-3 w-3 bg-white rounded-full shadow-lg"></div>
                 </div>
              </MarkerContent>
            </MapMarker>
          </Map>

          {/* Interaction Overlay */}
          {!isMapActive && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-500 group-hover/map:bg-black/20">
              <button 
                onClick={() => setIsMapActive(true)}
                className="px-8 py-3 bg-primary text-white font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(254,22,22,0.4)] hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-primary"
              >
                Interagir com o Mapa
              </button>
            </div>
          )}
        </div>

        {/* Call to Action to Maps */}
        <div className="relative z-20 flex justify-center w-full max-w-xs mx-auto">
          <a 
            href="https://goo.gl/maps/3pnvWbE9Wu4zWpY56" 
            target="_blank" 
            rel="noreferrer"
            className="btn-magnetic relative group overflow-hidden inline-flex items-center justify-center bg-transparent border-2 border-primary text-primary w-full py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:text-white transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
            <span className="relative z-10 flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Abrir no Google Maps
            </span>
          </a>
        </div>
      </div>
      
    </section>
  );
}
