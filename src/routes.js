const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngsController = require('./Controllers/OngsController');
const IncidentController = require('./Controllers/IncidentController');
const ProfileController = require('./Controllers/ProfileController');
const SessionController = require('./Controllers/SessionController');

const routes = express.Router();

routes.post('/session',SessionController.create);

//Criando Ongs
routes.get('/ongs', OngsController.index);
//Listando Ongs

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) ,OngsController.create);


//Listando Casos(incidents)
routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page : Joi.number(),
    }),
}) ,IncidentController.index);
//Criando Casos(incidents)
routes.post('/incidents', IncidentController.create);
//Deletando Casos(incidents)
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}) ,IncidentController.delete);

//listando Caso Especifico(profile)
routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) , ProfileController.index);

module.exports = routes;