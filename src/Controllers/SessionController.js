import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function create(request, response) {
    const { id } = request.body;

    const ong = await prisma.ongs.findFirst({
        where:{id:id},
        select:{name:true}
    })

    if (!ong) {
        return response.status(400).json({ error: 'No ONG find with this ID' });
    }

    return response.json(ong);
}