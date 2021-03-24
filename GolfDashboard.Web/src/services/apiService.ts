import { Note, Tag } from '../models';

export class APIService {

    private _url: string;

    constructor() {
        this._url = process.env.REACT_APP_API_URL ?? "";
    }

    clubsURL(position: GeolocationPosition | null): string {
        let baseURL = this._url + "/golfclubs";

        if(position !== null) {
            baseURL += "?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude;
        }

        return baseURL;
    }

    async getTags(): Promise<Array<Tag>> {

        let response = await fetch(this._url + "/tags");

        if(!response.ok) {
            throw new Error();
        }

        return await response.json();
    }

    async saveNewNote(note: Note): Promise<boolean> {

        let response = await fetch(this._url + "/note", {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response.ok;

    }
}