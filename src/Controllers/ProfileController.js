import connection from '../database/connection.js';

export async function index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*');

    return response.json(incidents);
}
export async function remove(request,response){
    const ong_id = request.headers.authorization;
    
    const res =  connection('ongs').where('id',ong_id)

    if (res){
        return response.json(res.delete());
    }
    return response.json("can't delete profile")

}