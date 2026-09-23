import { useNavigate, useLocation } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Coffee,
  Compass,
  Sparkles,
  Star,
  MapPin,
  ArrowUpRight,
  Flame,
  ChevronRight,
} from "lucide-react";

export interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NavItem {
  label: string;
  sublabel: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      label: "Início",
      sublabel: "Apresentação & Manifesto",
      path: "/home#topo",
      icon: Compass,
    },
    {
      label: "Como funciona",
      sublabel: "Guia em 3 passos simples",
      path: "/home#como-funciona",
      icon: Sparkles,
      badge: "3 passos",
    },
    {
      label: "Cafés em destaque",
      sublabel: "Pinheiros, Vila Madalena, Bela Vista",
      path: "/home#cafes",
      icon: Coffee,
      badge: "Curadoria",
    },
    {
      label: "Avaliações",
      sublabel: "Notas de degustação reais da comunidade",
      path: "/home#avaliacoes",
      icon: Star,
      badge: "4.9 ★",
    },
    {
      label: "Mapa de Cafés",
      sublabel: "Explore cafeterias por geolocalização",
      path: "/maps",
      icon: MapPin,
      badge: "São Paulo",
    },
  ];

  const handleNavClick = (path: string) => {
    onOpenChange(false);

    if (path.includes("#")) {
      const [, hash] = path.split("#");
      const isHome = location.pathname === "/home" || location.pathname === "/";

      if (!isHome) {
        navigate(path);
      } else {
        if (hash === "topo") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            navigate(path);
          }
        }
      }
    } else {
      navigate(path);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[310px] sm:w-[360px] !bg-[#050403] !border-r !border-[#211811] !text-[#ECE4DA] p-0 flex flex-col justify-between overflow-y-auto [&>button]:text-[#94877D] [&>button:hover]:text-[#ECE4DA] [&>button]:cursor-pointer [&>button]:hover:bg-[#0D0B09] [&>button]:p-1.5 [&>button]:rounded-lg [&>button]:transition-colors"
      >
        {/* Top Header */}
        <div className="flex-1 flex flex-col">
          <SheetHeader className="p-6 pb-4 border-b border-[#211811] text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D0B09] border border-[#211811] text-[#B76A3D] shadow-inner">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <SheetTitle className="text-base font-bold tracking-tight text-[#ECE4DA]">
                  Guia do Cafezin
                </SheetTitle>
                <p className="text-[11px] font-medium text-[#94877D]">
                  Cafés Especiais • São Paulo
                </p>
              </div>
            </div>

            <SheetDescription className="text-xs text-[#94877D] leading-relaxed pt-2">
              Curadoria de cafeterias independentes, grãos de pequenos produtores e métodos manuais.
            </SheetDescription>

            <div className="pt-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide uppercase text-[#B76A3D] bg-[#0D0B09] px-2.5 py-1 rounded-md border border-[#211811]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#607654] animate-pulse" />
                Edição São Paulo • 2025
              </div>
            </div>
          </SheetHeader>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 flex-1" aria-label="Navegação do menu lateral">
            <p className="px-3 text-[10px] font-bold tracking-wider uppercase text-[#94877D]/60 mb-2">
              Menu de Navegação
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isExactPage = location.pathname === item.path;
              const isHashActive =
                item.path.includes("#") &&
                location.hash === `#${item.path.split("#")[1]}`;
              const isActive = isExactPage || isHashActive;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full group flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0D0B09] border-[#B76A3D]/50 text-[#ECE4DA] shadow-xs"
                      : "bg-transparent border-transparent hover:bg-[#0D0B09] hover:border-[#211811] text-[#94877D] hover:text-[#ECE4DA]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        isActive
                          ? "bg-[#B76A3D]/10 border-[#B76A3D]/30 text-[#B76A3D]"
                          : "bg-[#0D0B09] border-[#211811] text-[#94877D] group-hover:text-[#B76A3D] group-hover:border-[#B76A3D]/30"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#ECE4DA] group-hover:text-[#C88758] transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-[#94877D] line-clamp-1">
                        {item.sublabel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#0D0B09] text-[#B76A3D] border border-[#211811]">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-[#94877D]/40 group-hover:text-[#B76A3D] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Curadoria Card */}
          <div className="px-4 pb-4">
            <div className="rounded-xl bg-[#0D0B09] p-3.5 border border-[#211811] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#ECE4DA]">
                <Flame className="w-3.5 h-3.5 text-[#B76A3D]" />
                <span>Padrão Café Especial</span>
              </div>
              <p className="text-[11px] text-[#94877D] leading-relaxed">
                Todas as cafeterias catalogadas trabalham com cafés 80+ pontos SCA, torra fresca e rastreabilidade do produtor.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <SheetFooter className="p-4 border-t border-[#211811] bg-[#0D0B09] flex flex-col gap-2.5">
          <Button
            type="button"
            onClick={() => {
              onOpenChange(false);
              navigate("/maps");
            }}
            className="w-full bg-[#B76A3D] hover:bg-[#C88758] text-[#050403] font-bold text-xs h-10 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm active:scale-[0.98]"
          >
            <span>Explorar no mapa interativo</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>

          <Separator className="bg-[#211811]/50" />

          <p className="text-center text-[10px] text-[#94877D]/60">
            Guia do Cafezin © 2025 • São Paulo, SP
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Sidebar;
