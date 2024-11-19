import LocationDataModel from '../data/LocationDataModel';

export default class ReadConfigResponseModel {
    private status: any;
    private devMode: boolean;
    private locations: any[];
    private checkpoint: any;

    constructor(status: any, content?: any) {
        this.status = status;

        if (status) {
            this.devMode = this.setDevMode(content.devMode);
            this.locations = this.setLocations(content.locations);
            this.checkpoint = content.checkpoint;
        }
    }

    validate(value) {
        return !(value === '' || value === null || value === undefined || (typeof value) !== 'string');
    }

    setDevMode(devMode) {
        if (this.validate(devMode)) {
            return devMode === "true";
        } else {
            return true;
        }
    }

    setGeoName(geoName) {
        if (this.validate(geoName)){
            return geoName;
        } else {
            return null;
        }
    }

    setLocations(locations) {
        let locationArray: any[] = [];
        
        for (const location of locations) {
            let country = location.country;
            let geoName = this.setGeoName(location.geoName);
            let imageUrl = location.imageUrl;
        
            if(this.validate(country)) {
                let array: any[] = [];
        
                array.push(country);
        
                for (const city of location.cities) {
                    if (this.validate(city)) {
                        array.push(city);
                    }
                }
        
                locationArray.push(new LocationDataModel(country, geoName, array, imageUrl));
            }
        }

        return locationArray;
    }
}