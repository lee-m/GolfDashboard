import { EditedClubDetails, GolfClub, Note, Tag } from '../models';

export class APIService {

    private _url: string;

    constructor() {
        this._url = process.env.REACT_APP_API_URL ?? "";
    }

    private getURL(urlPath: string): string {
        return this._url + urlPath;
    }

    private async getResponseJSON<T>(url: string): Promise<T> {

        let response = await fetch(this.getURL(url));

        if (!response.ok) {
            throw new Error();
        }

        return await response.json();
    }

    async getClubs(position: GeolocationPosition | null): Promise<Array<GolfClub>> {

        let baseURL = "/golfclubs";

        if (position !== null) {
            baseURL += "?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude;
        }

        return await this.getResponseJSON<Array<GolfClub>>(baseURL);
    }

    async getClub(clubID: number): Promise<GolfClub> {

        let url = "/golfclubs?id=" + clubID;
        return await this.getResponseJSON<GolfClub>(url);
    }

    async getTags(): Promise<Array<Tag>> {
        return await this.getResponseJSON<Array<Tag>>("/tags");
    }

    async getNotes(): Promise<Array<Note>> {
        return await this.getResponseJSON<Array<Note>>("/note");
    }

    async saveNote(note: Note): Promise<boolean> {

        let response = await fetch(this.getURL("/note"), {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response.ok;
    }

    async deleteNote(id: number): Promise<boolean> {

        let response = await fetch(this.getURL("/note?id=" + id.toString()), {
            method: "DELETE"
        });

        return response.ok;
    }

    async deleteTag(id: number): Promise<boolean> {

        let response = await fetch(this.getURL("/tags?id=" + id.toString()), {
            method: "DELETE"
        });

        return response.ok;

    }

    async saveClub(clubDetails: EditedClubDetails): Promise<boolean> {

        let response = await fetch(this.getURL("/golfClubs"), {
            method: "POST",
            body: JSON.stringify(clubDetails),
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response.ok;
    }
}