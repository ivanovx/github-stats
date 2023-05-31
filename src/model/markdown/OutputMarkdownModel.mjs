export default class OutputMarkdownModel{
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