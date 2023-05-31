import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function index(request, response) {
  const count = await prisma.incidents.count();

  const incidents = await prisma.incidents.findMany({
    include: {
      ong: {
        select: {
          name: true,
          email: true,
          whatsapp: true,
          city: true,
          uf: true,
        },
      },
    },
  });

  response.header("x-total-count", count["count(*)"]);

  return response.json(incidents);
}
export async function create(request, response) {
  const { title, description, value } = request.body;

  const ong_id = request.headers.authorization;

  const criado = await prisma.incidents.create({
    data: {
      title,
      description,
      value,
      ong_id,
    },
  });

  return response.json({ id : criado.id });
}
export async function remove(request, response) {
  const { id } = request.params;
  const ong_id = request.headers.authorization;

   const incident = await prisma.incidents.findFirst({
    where : {id: id},
    select: {ong_id: true},
   })

   console.log({'incidente':incident.ong_id})

  //caso de erro retorna ao erro 401 do http - Unathorized(não autorizado)
  if (incident.ong_id !== ong_id) {
    return response.status(401).json({ error: "Operation not Permitted" });
  }else{
  await prisma.incidents.delete({where: {id:id}});


  return response.status(204).send();
  }
}
