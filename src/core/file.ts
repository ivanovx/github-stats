// MIGRATE to classic nodejs fs module
//import fs from 'fs-extra';

//import fs from 'fs/promises';

import fs from 'node:fs/promises';
import path from 'node:path';

import OutputFileResponseModel from '../model/file/OutputFileResponseModel';
import ReadFileResponseModel from '../model/file/ReadFileResponseModel';

export default class File {
    static async outputJson(fileName, json) {
        try {
            const dir = path.dirname(fileName);

            if (!(await fs.exists(dir))) {
                await fs.mkdir(dir, { recursive: true });
            }
 
            //await fs.writeFile(fileName, json);
           // await fs.outputJson(fileName, json);

            await Bun.write(fileName, JSON.stringify(json));

            return new OutputFileResponseModel(true, `Json file has been updated at ${fileName}`);
        } catch (error) {
            return new OutputFileResponseModel(false, `Json file has not been updated at ${fileName}`)
        }
    }

    static async outputOther(fileName, file) {
        try {
            //await fs.outputFile(fileName, file);
            //await fs.writeFile(fileName, file);

            const dir = path.dirname(fileName);

            if (!(await fs.exists(dir))) {
                await fs.mkdir(dir, { recursive: true });
            }

            await Bun.write(fileName, file);

            return new OutputFileResponseModel(true, `Other file has been updated at ${fileName}`)
        } catch (error) {
            return new OutputFileResponseModel(false, `Other file has not been updated at ${fileName}`)
        }
    }

    static async readJson(fileName) {
        try {
           // const content = await fs.readFile(fileName, { encoding: "utf-8" });
           // const json = JSON.parse(content);
            //let json = await fs.readJson(fileName);
            let json = await Bun.file(fileName).json();

            return new ReadFileResponseModel(true, `Json file has been read at ${fileName}`, json);
        } catch (error) {
            return new ReadFileResponseModel(false, `Json file has not been read at ${fileName}`);
        }
    }
}