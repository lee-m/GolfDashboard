import { ServiceBase } from './serviceBase';

export class ClubsService extends ServiceBase {

    clubsURL(position: GeolocationPosition | null): string {

        let baseURL = this.getURL("/golfclubs");

        if(position !== null) {
            baseURL += "?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude;
        }

        return baseURL;
    }
}