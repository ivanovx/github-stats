export default  class OctokitPageInfoModel {
    constructor (pageInfo) {
        this.endCursor = pageInfo.endCursor;
        this.hasNextPage = pageInfo.hasNextPage;
    }
}