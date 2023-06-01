import UserDataModel from '../data/UserDataModel.mjs';

export default class ReadCacheResponseModel {
    constructor(status, content) {
        this.status = status;

        if (status) {
            this.users = this.setUsers(content);
        } 
    }

    validate(value) {
        return (value === '' || value === null || value === undefined);
    }

    setValue(value) {
        if (this.validate(value)) {
            return "undefined value";
        } else {
            return value;
        }
    }

    setUsers(content) {
        let array = [];

        for (const user of content){
            let userDataModel = new UserDataModel(
                this.setValue(user.login),
                this.setValue(user.name),
                this.setValue(user.avatarUrl),
                this.setValue(user.location),
                this.setValue(user.company),
                this.setValue(user.twitterUsername),
                this.setValue(user.followers),
                this.setValue(user.privateContributions),
                this.setValue(user.publicContributions)
            );

            array.push(userDataModel)
        }

        return array;
    }
}