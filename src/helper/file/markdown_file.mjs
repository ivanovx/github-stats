import File from '../../core/file.mjs';

export default class MarkdownFile {
    static async outputMarkdownFile(fileName, markdown) {
        const outputFileResponseModel = await File.outputOther(fileName, markdown);

        console.log(outputFileResponseModel.message);
    }
}