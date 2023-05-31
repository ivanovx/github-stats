import File from '../../core/file.mjs';
import ReadCacheResponseModel from '../../model/cache/ReadCacheResponseModel.mjs';

let cacheFile = (function () {
    let outputCacheFile = async function (fileName, json) {
        let outputFileResponseModel = await File.outputJson(fileName, json);
        
        console.log(outputFileResponseModel.message)
    }

    let readCacheFile = async function (fileName) {
        let readFileResponseModel = await File.readJson(fileName);

        console.log(readFileResponseModel.message)

        if(readFileResponseModel.status){
            return new ReadCacheResponseModel(readFileResponseModel.status, readFileResponseModel.content)
        } else {
            return new ReadCacheResponseModel(readFileResponseModel.status)
        }
    }

    return {
        outputCacheFile: outputCacheFile,
        readCacheFile: readCacheFile
    };
})();

export default cacheFile;