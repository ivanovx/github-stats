export default class ReadCheckpointResponseModel {
    private status: any;
    private checkpoint: any;
    
    constructor(status: any, content?: any) {
        this.status = status;

        if (status) {
            this.checkpoint = this.setCheckpoint(content.checkpoint);
        } 
    }

    validate(value) {
        return !(value === '' || value === null || value === undefined);
    }

    setCheckpoint(checkpoint) {
        if (this.validate(checkpoint)) {
            return checkpoint;
        } else {
            return 0;
        }
    }
}