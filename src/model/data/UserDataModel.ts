export default class UserDataModel {
   private login: any;
   private name: any;
   private avatarUrl: any;
   private location: any;
   private company: any;
   private twitterUsername: any;
   private followers: any;
   private privateContributions: any;
   private publicContributions: any;

    constructor(
        login, 
        name, 
        avatarUrl, 
        location,
        company,
        twitterUsername,
        followers,
        privateContributions,
        publicContributions
    ) {
        this.login = login;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.location = location;
        this.company = company;
        this.twitterUsername = twitterUsername;
        this.followers = followers;
        this.privateContributions = privateContributions;
        this.publicContributions = publicContributions;
    }
}