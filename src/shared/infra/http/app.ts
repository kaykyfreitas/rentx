import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors"
import createConnection from '../typeorm';
// import '../typeorm'
import '@shared/container'

import { router } from '@shared/infra/http/routes';
import swaggerUI from "swagger-ui-express"

import swaggerFile from "../../../swagger.json"
import { AppError } from '@shared/errors/AppError';


const app = express();

createConnection().then(() => console.log('connected to database'));

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});
export { app }