
import { Link } from "react-router";

const Logo = ({ footer = false }: { footer?: boolean }) => {
  return (
    <Link
      className={`whitespace-nowrap font-black tracking-[-0.06em] ${footer ? "text-sm" : "text-base"}`}
      to="/home"
      aria-label="Guia do Cafezin, início"
    >
      GUIA
      {" "}
      <span className="mx-1 text-[9px] font-bold tracking-normal text-caramel-light">
        DO
      </span>
      {" "}
      CAFEZIN<i className="ml-0.5 align-top text-[8px] not-italic">®</i>
    </Link>
  );
}

export default Logo;
