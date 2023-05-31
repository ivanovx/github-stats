let ReadFileResponseModel =  function (status, message, content) {
    this.status = status;
    this.message = message;
    if(status) this.content = content;
}

export default ReadFileResponseModel;