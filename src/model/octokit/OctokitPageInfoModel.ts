export default class OctokitPageInfoModel {
    private endCursor: any;
    private hasNextPage: boolean;

    constructor (pageInfo) {
        this.endCursor = pageInfo.endCursor;
        this.hasNextPage = pageInfo.hasNextPage;
    }
}