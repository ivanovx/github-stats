import HtmlFile from '../../helper/file/htmlFile';

export default class OutputHtml {
    static HTML_FILE = "index.html";
    static RANKING_FILE = "ranking.json";

    static setHtmlFilePath() {
        return `docs/${this.HTML_FILE}`;
    }

    static setRankingJsonFilePath() {
        return `docs/${this.RANKING_FILE}`;
    }

    static async saveHtmlFile(html) {
        await HtmlFile.outputHtmlFile(this.setHtmlFilePath(), html);
    }
    
    static async saveRankingJsonFile(json) {
        await HtmlFile.outputJsonFile(this.setRankingJsonFilePath(), json);
    }
}