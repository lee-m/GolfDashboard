import { GolfClub } from '../golfClub';

export class APIService {

    private _url: string;

    constructor() {
        this._url = process.env.REACT_APP_API_URL ?? "";
    }

    getGolfClubs(position: GeolocationPosition | null): Promise<Array<GolfClub>> {

        let baseURL = this._url + "/golfclubs"

        if(position !== null) {
            baseURL += "?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude;
        }

        return fetch(baseURL).then(result => result.json());
    }
}