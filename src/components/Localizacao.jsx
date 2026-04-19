import React, { useState, Suspense, lazy } from 'react';
import { Loader2, X } from 'lucide-react';

const LazyMapCanvas = lazy(() =>
  import('./ui/map').then((module) => ({
    default: function MapCanvas() {
      const { Map, MapMarker, MarkerContent } = module;

      return (
        <Map
          center={[-49.1832, -16.6565]}
          zoom={15}
          cooperativeGestures={true}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        >
          <MapMarker longitude={-49.1832} latitude={-16.6565}>
            <MarkerContent>
              <div className="relative h-10 w-10 rounded-full border-2 border-[#FE1616] bg-primary/20 flex flex-col items-center justify-center animate-pulse shadow-[0_0_30px_rgba(254,22,22,0.8)] backdrop-blur-md">
                <div className="h-4 w-4 bg-white rounded-full shadow-lg" />
              </div>
            </MarkerContent>
          </MapMarker>
        </Map>
      );
    },
  }))
);

export default function Localizacao() {
  const [isMapActive, setIsMapActive] = useState(false);

  return (
    <section id="localizacao" className="py-24 px-6 md:px-12 w-full bg-transparent relative overflow-hidden flex flex-col items-center justify-center z-10">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0D0D12] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[#FE1616] opacity-[0.03] filter blur-[150px] rounded-full pointer-events-none w-[80%] h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative text-center z-20 mb-16 max-w-2xl mx-auto flex flex-col items-center">
        <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Como Chegar</span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-zinc-200 uppercase mb-6 leading-tight">
          Nossa <span className="font-drama italic text-primary">Localização</span>
        </h2>
        <p className="text-zinc-200 font-light leading-relaxed text-lg md:text-xl">
          Localizado na Região Leste de Goiânia, com estacionamento privativo e fácil acesso para você focar apenas no seu treino.
        </p>
        <p className="text-zinc-200 text-xs mt-3 tracking-wide uppercase">Goiânia — GO</p>
      </div>

      <div className="relative z-20 flex flex-col items-center w-full max-w-4xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none z-0" />

        <div className="relative z-10 w-full max-w-4xl rounded-[40px] border border-white/5 overflow-hidden shadow-[0_0_50px_rgba(254,22,22,0.05)] h-[450px] mb-12 flex justify-center bg-[#111115] group/map">
          {isMapActive ? (
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full w-full">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              }
            >
              <button
                onClick={() => setIsMapActive(false)}
                className="absolute top-4 right-4 z-[40] p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-primary transition-colors duration-300"
                title="Desativar interação"
              >
                <X className="w-5 h-5" />
              </button>

              <LazyMapCanvas />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-[10px] text-zinc-400 pointer-events-none opacity-0 animate-fade-in [animation-delay:2s] animation-fill-forwards">
                Pressione Ctrl + Scroll para dar zoom
              </div>
            </Suspense>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center group">
              <div className="absolute inset-0 bg-[#0a0a0c] opacity-50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a0a0c_70%)]" />
                <svg className="absolute w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,20 L100,50 M30,0 L70,100 M0,80 L100,60" stroke="#FE1616" strokeWidth="0.5" fill="none" />
                </svg>
              </div>

              <div className="relative z-30 flex flex-col items-center gap-4 px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Explorar Mapa</h3>
                <p className="text-zinc-400 text-sm max-w-[280px]">Clique para carregar o mapa interativo e encontrar o melhor caminho.</p>

                <button
                  onClick={() => setIsMapActive(true)}
                  className="mt-4 px-10 py-4 bg-primary text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-full shadow-[0_0_30px_rgba(254,22,22,0.3)] hover:shadow-[0_0_50px_rgba(254,22,22,0.5)] transition-all duration-500 transform hover:scale-105 active:scale-95 border-2 border-primary"
                >
                  Interagir com o Mapa
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-20 flex justify-center w-full max-w-xs mx-auto">
          <a
            href="https://goo.gl/maps/3pnvWbE9Wu4zWpY56"
            target="_blank"
            rel="noreferrer"
            className="btn-magnetic relative group overflow-hidden inline-flex items-center justify-center bg-transparent border-2 border-primary text-primary w-full py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:text-white transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
            <span className="relative z-10 flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Abrir no Google Maps
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
