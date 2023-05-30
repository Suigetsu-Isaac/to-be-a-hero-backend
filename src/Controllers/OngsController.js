import generateUniqueId from '../utils/generateUniqueId.js';
import connection from '../database/connection.js';

export async function index(request, response) {
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
}
export async function create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = generateUniqueId();

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    });

    return response.json({ id });
}

