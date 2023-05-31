import generateUniqueId from '../utils/generateUniqueId.js';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();


export async function index(request, response) {

    

    const ongs = await prisma.ongs.findMany();
    console.log(ongs)
    return response.json(ongs);
}
export async function create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = generateUniqueId();

     await prisma.ongs.create({
        data:{
            id,
            name,
            city,
            email,
            uf,
            whatsapp
        }
     })
    return response.json({ id });
}

