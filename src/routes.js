import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { index, create } from './Controllers/OngsController.js';
import { index as _index, create as _create, remove } from './Controllers/IncidentController.js';
import { index as __index, remove as removeProfile } from './Controllers/ProfileController.js';
import { create as __create } from './Controllers/SessionController.js';

const routes = Router();

routes.post('/session',__create);

//Criando Ongs
routes.get('/ongs', index);
//Listando Ongs

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(13).max(14),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) ,create);


//Listando Casos(incidents)
routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page : Joi.number(),
    }),
}) ,_index);
//Criando Casos(incidents)
routes.post('/incidents', _create);
//Deletando Casos(incidents)
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}) ,remove);

//listando Caso Especifico(profile)
routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) , __index);


routes.delete('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), removeProfile)
export default routes;