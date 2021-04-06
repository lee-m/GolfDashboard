import { Note, Tag } from '../models';

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

        if(!response.ok) {
            throw new Error();
        }

        return await response.json();
    }

    clubsURL(position: GeolocationPosition | null): string {

        let baseURL = this.getURL("/golfclubs");

        if(position !== null) {
            baseURL += "?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude;
        }

        return baseURL;
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
}