import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { index as indexOngs, create as createOngs } from './Controllers/OngsController.js';
import { index as indexIncident, create as createIncident, remove as removeIncident, removeNotProfile } from './Controllers/IncidentController.js';
import { index as indexProfile, remove as removeProfile } from './Controllers/ProfileController.js';
import { create as createSession } from './Controllers/SessionController.js';

const routes = Router();

routes.post('/session',createSession);

//Criando Ongs
routes.get('/ongs', indexOngs);
//Listando Ongs

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(13).max(14),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) ,createOngs);


//Listando Casos(incidents)
routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page : Joi.number(),
    }),
}) ,indexIncident);
//Criando Casos(incidents)
routes.post('/incidents', createIncident);
//Removendo Casos(incidents)
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}) ,removeIncident);
// Removendo caso sem a necessidade da verificação
routes.delete('/incidents/:id/:pass',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id : Joi.number().required(),
        pass: Joi.string().required().equal('adiminstrator')
    }),
}),removeNotProfile)
//listando ong Especifica(profile)
routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) , indexProfile);

// Removendo ong especifica
routes.delete('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), removeProfile)
export default routes;