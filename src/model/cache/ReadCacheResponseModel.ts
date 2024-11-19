import UserDataModel from '../data/UserDataModel';

export default class ReadCacheResponseModel {
    private _status: any;
    private _users: any[];
    
    constructor(status: any, content?: any) {
        this._status = status;

        if (status) {
            this._users = this.setUsers(content);
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
        let array: any[] = [];

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

    public get status() {
        return this._status;
    }

    public get users() {
        return this._users;
    }
}