import { Button } from "../ui/button";
import CardBaseDonation from "./CardBaseDonation";

interface CardSuccessProps {
  onClickBack?: () => void;
  textMode: string;
}

const CardSuccess = ({ onClickBack, textMode }: CardSuccessProps) => {
  return (
    <>
      <CardBaseDonation
        children={
          <>
            <main className="flex flex-col justify-center items-center gap-4 ">
              <img
                src="https://res.cloudinary.com/dtglxnl4z/image/upload/v1763081611/bro3_mpmujz.png"
                className="w-32 sm:max-w-sm sm:w-auto h-auto rounded-lg object-cover mb-2"
                alt="Sucesso"
              />
              <h1 className="text-[#B76A3D] font-bold text-2xl sm:text-3xl text-center">
                Sucesso!!
              </h1>
              <p className="text-[#ECE4DA] text-base sm:text-lg text-center leading-relaxed">
                {textMode === "ong"
                  ? "Cadastro concluído! Mais uma ONG fazendo a diferença conectada à nossa rede."
                  : "Solicitação enviada! Agradecemos por contribuir para essa causa."}
              </p>
              <Button
                className="bg-[#B76A3D] hover:bg-[#C88758] px-4 py-3 sm:px-6 sm:py-2 font-semibold w-full max-w-xs text-base sm:text-lg rounded-md"
                onClick={onClickBack}
              >
                Voltar para o início
              </Button>
            </main>
          </>
        }
      />
    </>
  );
};
export default CardSuccess;
