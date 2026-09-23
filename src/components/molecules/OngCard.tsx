import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from "../ui/card";

interface IOngCardProps {
  title: string;
  address: string;
  description: string;
}

export const OngCard = ({ title, address, description }: IOngCardProps) => {
  return (
    <>
      <Card className="bg-[#050403] p-4 border-none cursor-pointer w-full">
        <CardTitle className="font-bold text-[#ECE4DA] text-sm">
          {title}
        </CardTitle>
        <CardContent className="text-xs p-0 text-[#ECE4DA]">
          <CardDescription>{address}</CardDescription>
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardContent className="flex flex-row gap-2 p-0">
          <CardAction className="flex flex-row gap-1 items-center mt-4">
            <BsFillTelephoneFill color="white" size={13} />
            <CardDescription className="text-xs text-[#ECE4DA]">
              Ligar
            </CardDescription>
          </CardAction>
          <CardAction className="flex flex-row gap-1 items-center mt-4">
            <BiMessageRoundedDetail color="white" size={13} />
            <CardDescription className="text-xs text-[#ECE4DA]">
              Detalhes
            </CardDescription>
          </CardAction>
        </CardContent>
      </Card>
    </>
  );
};
