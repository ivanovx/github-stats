export default class ReadFileResponseModel {
    constructor(status, message, content) {
        this.status = status;
        this.message = message;

        if (status) {
            this.content = content;
        } 
    }
}  