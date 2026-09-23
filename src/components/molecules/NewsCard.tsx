import { Card, CardAction, CardContent, CardTitle } from "../ui/card";

interface NewsletterCardProps {
  title: string;
  imageUrl: string;
  link?: string;
}

const NewsCard = ({ title, imageUrl, link }: NewsletterCardProps) => {
  return (
    <Card className="flex flex-col gap-4 py-0 items-start bg-[#050403] text-[#ECE4DA] rounded-none">
      <img
        className="w-full sm:w-80 h-32 sm:h-40 object-cover rounded-xs"
        src={imageUrl}
        alt={title}
      />
      <CardContent className="flex-1 flex flex-col w-80 pb-4">
        <CardTitle className="text-md font-semibold mb-2 ">{title}</CardTitle>
        <CardAction className="flex justify-end mt-auto">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-4 py-2 rounded-md text-[#B76A3D] font-medium underline hover:text-[#B76A3D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C88758] focus:ring-offset-2 active:bg-[#211811] text-base sm:text-sm"
              aria-label={`Leia mais sobre ${title}`}
              tabIndex={0}
            >
              <span className="mr-2">Leia mais</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </CardAction>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
