
const Logo = ({ footer = false }: { footer?: boolean }) => {
  return (
    <a
      className={`whitespace-nowrap font-black tracking-[-0.06em] ${footer ? "text-sm" : "text-base"}`}
      href="#top"
      aria-label="Guia do Cafezin, início"
    >
      GUIA
      <span className="mx-1 text-[9px] font-bold tracking-normal text-caramel-light">
        DO
      </span>
      CAFEZIN<i className="ml-0.5 align-top text-[8px] not-italic">®</i>
    </a>
  );
}

export default Logo;