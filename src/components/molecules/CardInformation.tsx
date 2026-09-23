import { Button } from "../ui/button";

interface CardInformationProps {
  title: string;
  description?: string;
  textButton?: string;
  onClickButton?: () => void;
  image: string;
}

const CardInformation = ({
  title,
  description,
  textButton,
  onClickButton,
  image,
}: CardInformationProps) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-8 px-4 py-8 text-[#ECE4DA] w-full">
      <div className="flex flex-col items-start max-w-3xl w-full mb-6 md:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          <span className="text-[#B76A3D]">{title.slice(0, 3)}</span>
          {title.slice(3)}
          {title}
        </h1>
        <p className="text-sm md:text-base mb-6">{description}</p>
        <Button
          className="bg-[#B76A3D] w-full md:w-auto hover:bg-[#C88758]  font-bold px-6 py-3 transition-colors duration-200 focus:ring-2 focus:ring-[#C88758] focus:outline-none"
          onClick={onClickButton}
        >
          {textButton}
        </Button>
      </div>
      <div className="flex justify-center items-center w-full md:w-auto">
        <img
          src={image}
          alt="Doe alimentos"
          className="max-w-md w-full h-auto rounded-lg object-cover"
        />
      </div>
    </section>
  );
};
export default CardInformation;
