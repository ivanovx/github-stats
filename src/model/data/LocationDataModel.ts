export default class LocationDataModel {
    private country: string;
    private geoName: string;
    private locations: string[];
    private imageUrl: string;
    
    constructor(country, geoName, locations, imageUrl) {
        this.country = country;
        this.geoName = geoName;
        this.locations = locations;
        this.imageUrl = imageUrl;
    }
}