import File from '../../core/file.mjs';

let htmlFile = function () {
    let outputHtmlFile = async function (fileName, html) {
        let outputFileResponseModel = await File.outputOther(fileName, html);
        console.log(outputFileResponseModel.message)
    }
    let outputJsonFile = async function (fileName, json) {
        let outputFileResponseModel = await File.outputJson(fileName, json);
        console.log(outputFileResponseModel.message)
    }
    return {
        outputHtmlFile: outputHtmlFile,
        outputJsonFile: outputJsonFile
    };
}();

export default htmlFile;