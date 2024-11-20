import ConfigFile from './helper/file/configFile';
import OutputCheckpoint from './helper/checkpoint/outputCheckpoint';
import OutputCache from './helper/cache/outputCache';
import outputMarkdown from './helper/markdown/outputmarkdown';
import outputHtml from './helper/html/outputHtml';
import createHtmlFile from './helper/html/file/createHtmlFile';
import createRankingJsonFile from './helper/html/file/createRankingJsonFile';
import createIndexPage from './helper/markdown/page/createIndexPage';
import createPublicContributionsPage from './helper/markdown/page/createPublicContributionsPage';
import createTotalContributionsPage from './helper/markdown/page/createTotalcontributionsPage';
import createFollowersPage from './helper/markdown/page/createFollowersPage';
import requestOctokit from './helper/octokit/requestOctokit';
import OutputMarkdownModel from './model/markdown/OutputMarkdownModel';

const GITHUB_TOKEN = Bun.env.GITHUB_TOKEN; //process.env.GITHUB_TOKEN;
const GITHUB_REPOSITORY = Bun.env.GITHUB_REPOSITORY; //process.env.GITHUB_REPOSITORY;
const MAXIMUM_ERROR_ITERATIONS = 4;

const saveCache = async readConfigResponseModel => {
    console.log('########## Save cache ##########');

    for await (const locationDataModel of readConfigResponseModel.locations) {
        let json = await requestOctokit.request(GITHUB_TOKEN, MAXIMUM_ERROR_ITERATIONS, locationDataModel.locations);
        let readCacheResponseModel =  await OutputCache.readCacheFile(locationDataModel.country);

        if (readCacheResponseModel.status) {
            if (readCacheResponseModel.users.length > json.length) {
                console.log(`octokit error cache:${readCacheResponseModel.users.length} octokit:${json.length}`);
            } else {
                console.log(`request success cache:${readCacheResponseModel.users.length} octokit:${json.length}`);
                
                await OutputCache.saveCacheFile(locationDataModel.country, json);
            }
        } else {
            console.log(`request success octokit:${json.length}`);
            
            await OutputCache.saveCacheFile(locationDataModel.country, json);
        }
    }
}
        
const saveMarkdown = async (readConfigResponseModel, readCheckpointResponseModel) => {
    console.log('########## Save Markdown ##########');

    for await (const locationDataModel of readConfigResponseModel.locations) {
        let readCacheResponseModel =  await OutputCache.readCacheFile(locationDataModel.country);

        if (readCacheResponseModel.status) {
            let outputMarkdownModel = new OutputMarkdownModel(GITHUB_REPOSITORY, locationDataModel, readCacheResponseModel, readConfigResponseModel);
            
            await outputMarkdown.savePublicContributionsMarkdownFile(locationDataModel.country, createPublicContributionsPage.create(outputMarkdownModel));
            await outputMarkdown.saveTotalContributionsMarkdownFile(locationDataModel.country, createTotalContributionsPage.create(outputMarkdownModel));
            await outputMarkdown.saveFollowersMarkdownFile(locationDataModel.country, createFollowersPage.create(outputMarkdownModel));
        }

        await OutputCheckpoint.saveCheckpointFile(readConfigResponseModel.locations, locationDataModel.country, readCheckpointResponseModel.checkpoint)
    }

    if (!readConfigResponseModel.devMode) {
        await outputMarkdown.saveIndexMarkdownFile(createIndexPage.create(GITHUB_REPOSITORY, readConfigResponseModel));
    } 
}
        
const saveHtml = async readConfigResponseModel => {
    console.log(`########## Save Html ##########`);
    
    await outputHtml.saveRankingJsonFile(await createRankingJsonFile(readConfigResponseModel));
    await outputHtml.saveHtmlFile(createHtmlFile());
}

const readConfigResponseModel = await ConfigFile.readConfigFile();
const readCheckpointResponseModel = await OutputCheckpoint.readCheckpointFile();

if (readConfigResponseModel.status && readCheckpointResponseModel.status) {
    await saveCache(readConfigResponseModel);
    await saveMarkdown(readConfigResponseModel, readCheckpointResponseModel)
    await saveHtml(readConfigResponseModel)
}