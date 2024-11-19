export default class OutputFileResponseModel {
    private status: any;
    private message: any;
    
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}