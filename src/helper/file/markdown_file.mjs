import file from '../../core/file.mjs';

let markdownFile = (function () {
    let outputMarkdownFile = async function (fileName, markdown) {
        let outputFileResponseModel = await file.outputOther(fileName, markdown);
        console.log(outputFileResponseModel.message)
    }
    return {
        outputMarkdownFile: outputMarkdownFile,
    };
})();

export default markdownFile;