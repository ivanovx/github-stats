import outputCache from '../../../helper/cache/outputCache';

export default async function createRankingJsonFile(readConfigResponseModel) {
    let countriesArray: any[] = [];

    for await (const locationDataModel of readConfigResponseModel.locations) {
        if (locationDataModel.geoName === null) {
            console.log(`Ranking not available for ${locationDataModel.country}`);
        } else {
            console.log(`Ranking available for ${locationDataModel.country}`);

            let readCacheResponseModel =  await outputCache.readCacheFile(locationDataModel.country);
            let totalPublicContributions = 0;

            if (readCacheResponseModel.status) {
                for (const user of readCacheResponseModel.users) {
                    if (user.publicContributions > 10000){
                        totalPublicContributions = totalPublicContributions + 10000;
                    } else {
                        totalPublicContributions = totalPublicContributions + (user.publicContributions);
                    }
                }

                countriesArray.push({ 
                    name: locationDataModel.geoName, 
                    value: totalPublicContributions
                });
            }
        }
    }

    return { ranking: countriesArray };
}