export default class OutputMarkdownModel {
    private githubUsernameAndRepository: any;
    private locationDataModel: any;
    private readCacheResponseModel: any;
    private readConfigResponseModel: any;

    constructor(
        githubUsernameAndRepository,
        locationDataModel,
        readCacheResponseModel,
        readConfigResponseModel
    ) {
        this.githubUsernameAndRepository = githubUsernameAndRepository;
        this.locationDataModel = locationDataModel;
        this.readCacheResponseModel = readCacheResponseModel;
        this.readConfigResponseModel = readConfigResponseModel;
    }
}