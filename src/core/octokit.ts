import { graphql } from "@octokit/graphql";

import OctokitResponseModel from "../model/octokit/OctokitResponseModel";

export default class Octokit {
    static getHeader(AUTH_KEY) {
        return {
            headers: {
                authorization: `token ${AUTH_KEY}`,
            }
        }
    }

    static getQuery(locations, numberOfUsers, cursor) {
        return {
            query: `query {
                search(type: USER, query:"${locations} sort:followers-desc", first:${numberOfUsers}, after:${cursor}) {
                    edges {
                        node {
                            __typename
                            ... on User {
                                login,
                                avatarUrl(size: 72),
                                name,
                                location,
                                company,
                                twitterUsername,
                                followers {
                                    totalCount
                                }
                                contributionsCollection {
                                    contributionCalendar {
                                        totalContributions
                                    }
                                    restrictedContributionsCount
                                }
                            }
                        }
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }`
        };
    }

    static setCursor(cursor) {
        if (cursor === null) {
            return cursor;
        } else {
            return `"${cursor}"`;
        }
    }

    static async request(AUTH_KEY, locations, cursor) {
        try {
            const graphqlWithAuth = graphql.defaults(this.getHeader(AUTH_KEY));
            const response = await graphqlWithAuth(this.getQuery(locations, 10, this.setCursor(cursor)));

            return new OctokitResponseModel(true, response);
        } catch (error) {
            console.log(error);

            return new OctokitResponseModel(false);
        }
    }
}