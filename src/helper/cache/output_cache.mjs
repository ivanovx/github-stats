import CacheFile from '../../helper/file/cache_file.mjs';

export default class OutputCache {
    static getCountryName(country) {
        return country.replace(/\s/g, '_').toLowerCase();
    }

    static getPath(country) {
        const fileName = this.getCountryName(country);

        return `cache/${fileName}.json`;
    }

    static async saveCacheFile(country, json) {
        await CacheFile.outputCacheFile(this.getPath(country), json);
    }

    static async readCacheFile(country) {
        return await CacheFile.readCacheFile(this.getPath(country));
    }
}
