import configFile from './helper/file/config_file.mjs';
import outputCheckpoint from './helper/checkpoint/output_checkpoint.mjs';
import outputCache from './helper/cache/output_cache.mjs';
import outputMarkdown from './helper/markdown/output_markdown.mjs';
import outputHtml from './helper/html/output_html.mjs';
import createHtmlFile from './helper/html/file/create_html_file.mjs';
import createRankingJsonFile from './helper/html/file/create_ranking_json_file.mjs';
import createIndexPage from './helper/markdown/page/create_index_page.mjs';
import createPublicContributionsPage from './helper/markdown/page/create_public_contributions_page.mjs';
import createTotalContributionsPage from './helper/markdown/page/create_total_contributions_page.mjs';
import createFollowersPage from './helper/markdown/page/create_followers_page.mjs';
import requestOctokit from './helper/octokit/request_octokit.mjs';
import OutputMarkdownModel from './model/markdown/OutputMarkdownModel.mjs';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || "your-username/repository-name";
const MAXIMUM_ERROR_ITERATIONS = 4;

const saveCache = async readConfigResponseModel => {
    console.log('########## Save cache ##########');

    for await (const locationDataModel of readConfigResponseModel.locations){
        let json = await requestOctokit.request(GITHUB_TOKEN, MAXIMUM_ERROR_ITERATIONS, locationDataModel.locations);
        let readCacheResponseModel =  await outputCache.readCacheFile(locationDataModel.country);

        if (readCacheResponseModel.status) {
            if (readCacheResponseModel.users.length > json.length) {
                console.log(`octokit error cache:${readCacheResponseModel.users.length} octokit:${json.length}`);
            } else {
                console.log(`request success cache:${readCacheResponseModel.users.length} octokit:${json.length}`);
                
                await outputCache.saveCacheFile(locationDataModel.country, json);
            }
        } else {
            console.log(`request success octokit:${json.length}`);
            
            await outputCache.saveCacheFile(locationDataModel.country, json);
        }
    }
}
        
const saveMarkdown = async (readConfigResponseModel, readCheckpointResponseModel) => {
    console.log('########## Save Markdown ##########');

    for await (const locationDataModel of readConfigResponseModel.locations) {
        let readCacheResponseModel =  await outputCache.readCacheFile(locationDataModel.country);

        if (readCacheResponseModel.status) {
            let outputMarkdownModel = new OutputMarkdownModel(GITHUB_USERNAME_AND_REPOSITORY, locationDataModel, readCacheResponseModel, readConfigResponseModel);
            
            await outputMarkdown.savePublicContributionsMarkdownFile(locationDataModel.country, createPublicContributionsPage.create(outputMarkdownModel));
            await outputMarkdown.saveTotalContributionsMarkdownFile(locationDataModel.country, createTotalContributionsPage.create(outputMarkdownModel));
            await outputMarkdown.saveFollowersMarkdownFile(locationDataModel.country, createFollowersPage.create(outputMarkdownModel));
        }

        await outputCheckpoint.saveCheckpointFile(readConfigResponseModel.locations, locationDataModel.country, readCheckpointResponseModel.checkpoint)
    }

    if (!readConfigResponseModel.devMode) {
        await outputMarkdown.saveIndexMarkdownFile(createIndexPage.create(GITHUB_REPOSITORY, readConfigResponseModel));
    } 
}
        
const saveHtml = async readConfigResponseModel => {
    console.log(`########## Save Html ##########`);
    
    await outputHtml.saveRankingJsonFile(await createRankingJsonFile.create(readConfigResponseModel));
    await outputHtml.saveHtmlFile(createHtmlFile.create());
}

const main = async () => {
    let readConfigResponseModel = await configFile.readConfigFile();
    let readCheckpointResponseModel = await outputCheckpoint.readCheckpointFile();

    if (readConfigResponseModel.status && readCheckpointResponseModel.status){
        await saveCache(readConfigResponseModel);
        await saveMarkdown(readConfigResponseModel, readCheckpointResponseModel)
        await saveHtml(readConfigResponseModel)
    }
}


(async() => {
    await main();
})();    
