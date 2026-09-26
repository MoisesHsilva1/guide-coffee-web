import { useState } from "react";

import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Map from "../organisms/Map";

function Maps() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 },
    },
    closed: {
      x: "100%",
      transition: { type: "spring" as const, stiffness: 300, damping: 30 },
    },
  };

  return (
    <div className="relative w-full h-screen bg-[#050403] text-[#ECE4DA] flex overflow-hidden">
      <Map
        aria-label="Mapa interativo de cafeterias"
        className="absolute inset-0 z-0 size-full"
        useUserLocation
      />
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] max-w-full z-20 bg-[#050403] shadow-2xl border-l border-[#211811] flex flex-col px-6 py-8 gap-8 sm:rounded-l-3xl sm:shadow-2xl sm:gap-8 overflow-y-auto"
            style={{
              boxShadow: "-8px 0 32px 0 rgba(0,0,0,0.45)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold tracking-tight text-[#ECE4DA]">
                Café selecionado
              </span>
              <button
                aria-label="Fechar sidebar"
                className="rounded-full p-2 bg-[#0D0B09] hover:bg-[#211811] transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <Button
              onClick={() => setSidebarOpen(false)}
              className="bg-[#B76A3D] hover:bg-[#C88758] text-[#ECE4DA] rounded-full shadow-lg px-5 py-3 font-semibold text-base transition-all"
            >
              fechar
            </Button>
          </motion.aside>
        )}
      </AnimatePresence>
      {!sidebarOpen && (
        <button
          className="fixed right-4 bottom-6 sm:top-6 sm:right-6 z-20 bg-[#B76A3D] hover:bg-[#C88758] text-[#ECE4DA] rounded-full shadow-lg px-5 py-3 font-semibold text-base transition-all"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir informações do mapa"
        >
          Ver informações
        </button>
      )}
    </div>
  );
}

export default Maps;
