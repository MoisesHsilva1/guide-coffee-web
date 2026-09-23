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

const CardRegisterOng = ({
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
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="text-[#ECE4DA] mb-1 font-medium">
              Nome
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Digite o nome da instituição" />
              )}
            />
            {errors.name?.message && (
              <span className="text-destructive mt-1">
                {String(errors.name.message)}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[#ECE4DA] mb-1 font-medium">
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
              <span className="text-destructive mt-1">
                {String(errors.email.message)}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-[#ECE4DA] mb-1 font-medium">
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
              <span className="text-destructive mt-1">
                {String(errors.phone.message)}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="cnpj" className="text-[#ECE4DA] mb-1 font-medium">
              CNPJ
            </label>
            <Controller
              name="cnpj"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Digite o CNPJ da instituição" />
              )}
            />
            {errors.cnpj && (
              <span className="text-destructive mt-1">
                {String(errors.cnpj.message)}
              </span>
            )}
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="address" className="text-[#ECE4DA] mb-1 font-medium">
              Endereço
            </label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o endereço da instituição"
                />
              )}
            />
            {errors.address && (
              <span className="text-destructive mt-1">
                {String(errors.address.message)}
              </span>
            )}
          </div>
          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="description"
              className="text-[#ECE4DA] mb-1 font-medium"
            >
              Descrição
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Descreva a missão e atividades da instituição"
                  rows={4}
                />
              )}
            />
            {errors.description && (
              <span className="text-destructive mt-1">
                {String(errors.description.message)}
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
                <Spinner color="white"/>
              </div>
            )}
          </div>
        </form>
      </Card>
    </>
  );
};

export default CardRegisterOng;
