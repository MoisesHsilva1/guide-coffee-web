import Logo from "../atoms/Logo";

const Footer = () => {
  return (
    <footer>
      <section className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-coffee-cream/25 px-3 py-5 text-center sm:justify-between sm:px-7">
        <Logo />
        <nav
          aria-label="Links do rodapé"
          className="flex flex-wrap justify-center gap-3 sm:gap-[17px]"
        >
          {[
            ["EXPLORAR", "/home#explorar"],
            ["MAPA", "/home#mapa"],
            ["CAFÉS", "/home#cafes"],
            ["AVALIAÇÕES", "/reviews"],
            ["SOBRE", "/sobre"],
            ["CONTATO", "/sobre#contato"],
          ].map(([label, href]) => (
            <a
              className="text-[8px] font-extrabold tracking-wider hover:text-caramel-light"
              href={href}
              key={label}
            >
              {label}
            </a>
          ))}
        </nav>
        <p className="w-full text-[8px] font-extrabold tracking-widest text-coffee-muted sm:w-auto">
          FEITO PRA QUEM LEVA CAFÉ A SÉRIO.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
