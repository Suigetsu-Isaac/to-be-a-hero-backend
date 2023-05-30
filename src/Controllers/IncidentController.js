import connection from '../database/connection.js';

export async function index(request, response) {
    const { page = 1 } = request.query;
    const [count] = await connection('incidents').count();

    const totalIncidents = await connection('incidents')

    console.log(totalIncidents)
    

    const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(10)
        .offset((page - 1) * 10)
        .select(['incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

    response.header('x-total-count', count['count(*)']);


    return response.json(incidents);
}
export async function create(request, response) {
    const { title, description, value } = request.body;


    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id,
    });

    return response.json({ id });
}
export async function remove(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;
    const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

    //caso de erro retorna ao erro 401 do http - Unathorized(não autorizado)
    if (incident.ong_id !== ong_id) {
        return response.status(401).json({ error: 'Operation not Permitted' });
    }
    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
}

export async function removeNotProfile(request,response){
    const { id } = request.params;
    const incident = await connection('incidents').where('id',id).delete();

    if (incident){
      return  response.json({
            remove: true
        })
    }
    return response.status(401).json({ error: 'Operation not Permitted' });
}