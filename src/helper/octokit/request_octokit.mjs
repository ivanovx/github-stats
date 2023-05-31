import Octokit from '../../core/octokit.mjs';

/**
 * TODO
**/

export default class RequestOctokit {
    static setLocation(place) {
        return place.replace(' ', '_').toLowerCase();
    }

    static setQuery(location) {
        let query = '';

        for (const place of location) {
            query = query + `location:${this.setLocation(place)} `;
        }

        return query;
    }

    static async request(AUTH_KEY, MAXIMUM_ERROR_ITERATIONS, location) {
        let hasNextPage = true;
        let cursor = null;
        let array = [];
        let iterations = 0;
        let errors = 0;

        while (hasNextPage) {
            let octokitResponseModel = await Octokit.request(AUTH_KEY, this.setQuery(location), cursor);

            if (octokitResponseModel.status) {
                hasNextPage = octokitResponseModel.pageInfo.hasNextPage;
                cursor = octokitResponseModel.pageInfo.endCursor;

                for(const userDataModel of octokitResponseModel.node) {
                    console.log(`iterations:(${iterations}) errors:(${errors}/${MAXIMUM_ERROR_ITERATIONS}) ${userDataModel.login} ${userDataModel.followers}`)
                    array.push(userDataModel)
                }

                //let interval = randomIntFromInterval(1000, 5000)
                console.log(`hasNextPage:${hasNextPage} cursor:${cursor} users:${array.length}`);

                //await setDelay(interval);

                iterations++;
            } else {
                //await setDelay(60000);

                errors ++;
            }

            if (errors >= MAXIMUM_ERROR_ITERATIONS) {
                hasNextPage = false;
            }  
        }

        return array;
    }
}

/*
let requestOctokit = function () {
    let setLocation = function (place) {
        return place.replace(' ', '_').toLowerCase();
    }

    let setQuery = function (location) {
        let query = '';
        for (const place of location) {
            query = query + `location:${setLocation(place)} `;
        }
        return query;
    }

    /*
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const setDelay = function(timeout){
        return new Promise(res => setTimeout(res, timeout));
    }
    */

  /*  let request = async function (AUTH_KEY, MAXIMUM_ERROR_ITERATIONS, location) {
        let hasNextPage = true;
        let cursor = null;
        let array = [];
        let iterations = 0;
        let errors = 0;

        while (hasNextPage) {
            let octokitResponseModel = await Octokit.request(AUTH_KEY, setQuery(location), cursor);

            if (octokitResponseModel.status) {
                hasNextPage = octokitResponseModel.pageInfo.hasNextPage;
                cursor = octokitResponseModel.pageInfo.endCursor;

                for(const userDataModel of octokitResponseModel.node) {
                    console.log(`iterations:(${iterations}) errors:(${errors}/${MAXIMUM_ERROR_ITERATIONS}) ${userDataModel.login} ${userDataModel.followers}`)
                    array.push(userDataModel)
                }

                //let interval = randomIntFromInterval(1000, 5000)
                console.log(`hasNextPage:${hasNextPage} cursor:${cursor} users:${array.length}`);

                //await setDelay(interval);

                iterations++;
            } else {
                //await setDelay(60000);

                errors ++;
            }

            if (errors >= MAXIMUM_ERROR_ITERATIONS) {
                hasNextPage = false;
            }  
        }

        return array;
    }

    return {
        request: request
    };
}();

export default requestOctokit;*/