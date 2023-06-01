import File from '../../core/file.mjs';
import ReadConfigResponseModel from '../../model/config/ReadConfigResponseModel.mjs';

export default class ConfigFile {
    static path = 'config.json';

    static async readConfigFile() {
        const readFileResponseModel = await File.readJson(this.path);

        console.log(readFileResponseModel.message);

        if (readFileResponseModel.status) {
            return new ReadConfigResponseModel(readFileResponseModel.status, readFileResponseModel.content);
        } else {
            return new ReadConfigResponseModel(readFileResponseModel.status);
        }
    }
}