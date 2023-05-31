let OctokitPageInfoModel =  function (pageInfo) {
    this.endCursor = pageInfo.endCursor;
    this.hasNextPage = pageInfo.hasNextPage;
}

export default OctokitPageInfoModel;