import OctokitPageInfoModel from './OctokitPageInfoModel';
import UserDataModel from '../data/UserDataModel';

export default class OctokitResponseModel {
    private status: boolean;
    private node: any;
    private pageInfo: any;

    constructor(status: boolean, response?:any) {
        this.status = status;

        if (this.status) {
            this.node = this.setUsers(response.search.edges);
            this.pageInfo = new OctokitPageInfoModel(response.search.pageInfo);
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

    setPublicContributions(contributionsCollection) {
        let totalContributions = contributionsCollection.contributionCalendar.totalContributions;
        let privateContributions = contributionsCollection.restrictedContributionsCount;
        
        return totalContributions - privateContributions;
    }

    setUsers(edges) {
        let array: any[] = [];

        for (const node of edges) {
            if (node.node.__typename === 'User') {
                let userDataModel = new UserDataModel(
                    this.setValue(node.node.login),
                    this.setValue(node.node.name),
                    this.setValue(node.node.avatarUrl),
                    this.setValue(node.node.location),
                    this.setValue(node.node.company),
                    this.setValue(node.node.twitterUsername),
                    this.setValue(node.node.followers.totalCount),
                    this.setValue(node.node.contributionsCollection.restrictedContributionsCount),
                    this.setValue(this.setPublicContributions(node.node.contributionsCollection))
                );

                array.push(userDataModel)
            }
        }

        return array;
    }
}