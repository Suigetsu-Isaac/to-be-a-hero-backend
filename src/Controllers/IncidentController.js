const connection = require('../database/connection');

module.exports = {

    async index(request,response){
        const { page = 1  } = request.query
        console.log(page)
        const [count] = await connection('incidents').count()

       
        const incidents = await connection('incidents')
        .join('ongs','ongs.id', '=', 'incidents.ong_id')
        .limit(10)
        .offset((page-1)*10)
        .select(['incidents.*', 
         'ongs.name',
         'ongs.email', 
         'ongs.whatsapp', 
         'ongs.city',
         'ongs.uf'
        ]);

        response.header('x-total-count', count['count(*)']);


        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;

        
        const ong_id = request.headers.authorization;

        const [id] = await connection ('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id });
    },

    async delete(request,response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        //caso de erro retorna ao erro 401 do http - Unathorized(não autorizado)
        if (incident.ong_id !== ong_id){
            return response.status(401).json( { error: 'Operation not Permitted' } );
        }
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}