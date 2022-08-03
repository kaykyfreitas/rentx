import { Router } from "express";
import { Categories } from "../repositories/Categories";

const categoriesRoutes = Router();
const repository = new Categories();

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const categoryAlreadyExists = repository.findByName(name);

    if(categoryAlreadyExists) {
        return response.status(400).json({ error: "Category alreadt exists" });
    }

    repository.create({ name, description });

    return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
    const list = repository.list();

    return response.json(list);
});

export { categoriesRoutes };