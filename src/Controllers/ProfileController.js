import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function index(request, response) {
    const ong_id = request.headers.authorization;
    
    const incidents = await prisma.incidents.findMany({
        where:{
            ong_id: ong_id,
        }
    })


    return response.json(incidents);
}
export async function remove(request,response){
    const [ong_id,auth] = String(request.headers.authorization).split(' ');
    console.log(ong_id);
    const res =  await prisma.ongs.delete({
        where : {
            id : ong_id
        }
    })
    console.log(res)
    if (res){
        return response.json(res);
    }
    return response.json("can't delete profile")

}