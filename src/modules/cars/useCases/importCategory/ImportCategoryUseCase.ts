import fs from "fs";
import { parse } from "csv-parse"
import { inject, injectable } from "tsyringe";

import { ICategories } from "../../repositories/ICategories";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {

    constructor( @inject("Categories") private repository: ICategories ) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];
        
            const parseFile = parse();

            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });

            }).on("end", () => {
                fs.promises.unlink(file.path)
                resolve(categories);

            }).on("error", (err) => {
                reject(err);
                console.log("deu merda pra porra")
            });

        });

    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        
        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = await this.repository.findByName(name);

            if(!existCategory) {
                await this.repository.create({
                    name, 
                    description,
                });
            }
        });
    }

}

export { ImportCategoryUseCase }
