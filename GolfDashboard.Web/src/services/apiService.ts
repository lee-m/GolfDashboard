import { GolfClub } from '../models/golfClub';

export class APIService {

    private _url: string;

    constructor() {
        this._url = process.env.REACT_APP_API_URL ?? "";
    }

    async getGolfClubs(position: GeolocationPosition | null): Promise<Array<GolfClub>> {

        let baseURL = this._url + "/golfclubs"

        if(position !== null) {
            baseURL += "?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude;
        }

        let response = await fetch(baseURL);

        if(!response.ok) {
            throw new Error();
        }

        return await response.json();
    }
}