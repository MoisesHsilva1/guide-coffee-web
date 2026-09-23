import { Controller, useFormContext, type FieldValues } from "react-hook-form";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";

interface CardRegisterOngProps {
  isLoading?: boolean;
  onClickBack?: () => void;
  onSubmit: (data: FieldValues) => void;
}

const CardRegisterDonor = ({
  isLoading,
  onClickBack,
  onSubmit,
}: CardRegisterOngProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FieldValues>();

  return (
    <>
      <Card className="bg-transparent rounded-sm p-6 max-w-xl mx-auto shadow-lg">
        <form
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="name" className="text-[#ECE4DA] font-medium">
              Nome
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Digite o nome da instituição" />
              )}
            />
            {errors.name && (
              <span className="text-destructive text-sm">
                {errors.name.message as string}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#ECE4DA] font-medium">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o email para contato"
                  type="email"
                />
              )}
            />
            {errors.email && (
              <span className="text-destructive text-sm">
                {errors.email.message as string}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-[#ECE4DA] font-medium">
              Telefone
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o telefone para contato"
                  type="tel"
                />
              )}
            />
            {errors.phone && (
              <span className="text-destructive text-sm">
                {errors.phone.message as string}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="message" className="text-[#ECE4DA] font-medium">
              Mensagem
            </label>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Digite o motivo de seu desejo de voluntariar"
                  rows={4}
                />
              )}
            />
            {errors.message && (
              <span className="text-destructive text-sm">
                {errors.message.message as string}
              </span>
            )}
          </div>
          <div className="md:col-span-2 flex justify-end mt-2 gap-2">
            <Button onClick={onClickBack}>Voltar</Button>
            {!isLoading && (
              <Button
                className="bg-[#B76A3D] hover:bg-[#C88758] px-6 py-2 font-semibold"
                type="submit"
                disabled={isLoading}
              >
                Registrar Instituição
              </Button>
            )}
            {isLoading && (
              <div className="bg-[#B76A3D] rounded-md text-[#ECE4DA] hover:bg-[#C88758] px-6 py-2 font-semibold">
                <Spinner color="white" />
              </div>
            )}
          </div>
        </form>
      </Card>
    </>
  );
};

export default CardRegisterDonor;
