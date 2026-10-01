import { prisma } from "../database/client.ts";


import type { CreateCarDto }
 from "../dto/car/createCarDto.ts";


import type { UpdateCarDto }
 from "../dto/car/updateCarDto.ts";


export function findAll() {
 return prisma.car.findMany({
   orderBy: {
     brand: "asc",
   },
 });
}


export function findById(id: number) {
 return prisma.car.findUnique({
   where: { id },
 });
}


export function create(data: CreateCarDto) {
 return prisma.car.create({
   data: {
     ...data,
     // O body chega como string (JSON), então convertemos para Date
     selling_date: data.selling_date
       ? new Date(data.selling_date as unknown as string)
       : null,
     // selling_price é Decimal: o Prisma aceita number ou string direto
     selling_price: data.selling_price ?? null,
     // Ausente = não enviado, o banco usa o padrão (NULL)
     customer_id: data.customer_id ?? undefined,
   },
 });
}


export function update(
  id: number,
  data: UpdateCarDto
) {
  return prisma.car.update({
    where: { id },
    data: {
      ...data,
      ...(data.selling_date !== undefined
        ? {
            selling_date: data.selling_date
              ? new Date(data.selling_date as unknown as string)
              : null,
          }
        : {}),
      ...(data.selling_price !== undefined
        ? { selling_price: data.selling_price ?? null }
        : {}),
      // null desvincula o carro do cliente, undefined não mexe no vínculo
      ...(data.customer_id !== undefined
        ? { customer_id: data.customer_id ?? null }
        : {}),
    },
  });
}


export function remove(id: number) {
 return prisma.car.delete({
   where: { id },
 });
}
