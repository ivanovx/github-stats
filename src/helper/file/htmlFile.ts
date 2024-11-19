import File from '../../core/file';

export default class HtmlFile {
    static async outputHtmlFile(fileName, html) {
        let outputFileResponseModel = await File.outputOther(fileName, html);

        console.log(outputFileResponseModel.message);
    }

    
    static async outputJsonFile(fileName, json) {
        let outputFileResponseModel = await File.outputJson(fileName, json);

        console.log(outputFileResponseModel.message);
    }
}