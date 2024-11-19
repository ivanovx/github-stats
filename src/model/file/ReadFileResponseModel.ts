export default class ReadFileResponseModel {
    private status: any;
    private message: any;
    
    constructor(status, message, content) {
        this.status = status;
        this.message = message;

        if (status) {
            this.content = content;
        } 
    }
}  