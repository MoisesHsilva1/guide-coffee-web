import { Coffee } from "lucide-react";

const Footer = () => {
  <>
    <footer className="border-t border-[#211811] bg-[#050403] py-10 text-xs text-[#94877D]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0D0B09] border border-[#211811] text-[#B76A3D]">
            <Coffee className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-[#ECE4DA]">Guia do Cafezin</span>
        </div>

        <div className="text-center sm:text-right">
          <span>© {new Date().getFullYear()} Guia do Cafezin.</span>
        </div>
      </div>
    </footer>
  </>;
};
export default Footer;
