import express from 'express';

// import createConnection from './database';
import './database'
import './shared/container'

import { router } from './routes';
import swaggerUI from "swagger-ui-express"

import swaggerFile from "./swagger.json"


const app = express();

// createConnection().then(() => console.log('connected to database'));

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running!"));