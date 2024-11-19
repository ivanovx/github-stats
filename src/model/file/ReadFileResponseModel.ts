export default class ReadFileResponseModel {
    private status: any;
    private message: any;
    private content: any;
    
    constructor(status: any, message: any, content?: any) {
        this.status = status;
        this.message = message;

        if (status) {
            this.content = content;
        } 
    }
}  