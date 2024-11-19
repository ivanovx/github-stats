import File from '../../core/file';
import ReadCheckpointResponseModel from '../../model/checkpoint/ReadCheckpointResponseModel';

export default class CheckpointFile {
    static path = 'checkpoint.json';

    static async outputCheckpointFile(json) {
        const outputFileResponseModel = await File.outputJson(this.path, json);
        
        console.log(outputFileResponseModel.message);
    }
    
    static async readCheckpointFile() {
        const readFileResponseModel = await File.readJson(this.path);

        console.log(readFileResponseModel.message);

        if (readFileResponseModel.status) {
            return new ReadCheckpointResponseModel(readFileResponseModel.status, readFileResponseModel.content);
        } else {
            return new ReadCheckpointResponseModel(readFileResponseModel.status);
        }
    }
}