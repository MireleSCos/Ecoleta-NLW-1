import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import {celebrate, Joi} from 'celebrate';

import PointsController from './controller/PointsController';
import ItemsController from './controller/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items',itemsController.index);

routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.string().required(),
            longitude: Joi.string().required(),
            uf: Joi.string().required().max(2),
            city: Joi.string().required(),
            items: Joi.string().required(),
        })
    },{
        abortEarly: false
    }),
    pointsController.create
);

routes.get('/points', pointsController.index);
routes.get('/points/:id',pointsController.show);

export default routes;