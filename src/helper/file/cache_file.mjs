import File from '../../core/file.mjs';
import ReadCacheResponseModel from '../../model/cache/ReadCacheResponseModel.mjs';

export default class CacheFile {
    static async outputCacheFile(fileName, json) {
        const outputFileResponseModel = await File.outputJson(fileName, json);
        
        console.log(outputFileResponseModel.message);
    }

    static async readCacheFile(fileName) {
        const readFileResponseModel = await File.readJson(fileName);

        console.log(readFileResponseModel.message);

        if (readFileResponseModel.status) {
            return new ReadCacheResponseModel(readFileResponseModel.status, readFileResponseModel.content);
        } else {
            return new ReadCacheResponseModel(readFileResponseModel.status);
        }
    }
}