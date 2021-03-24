export class ServiceBase {

    private _url: string;

    constructor() {
        this._url = process.env.REACT_APP_API_URL ?? "";
    }

    protected getURL(urlPath: string): string {
        return this._url + urlPath;
    }

    protected async getResponseJSON<T>(url: string): Promise<T> {

        let response = await fetch(this.getURL(url));

        if(!response.ok) {
            throw new Error();
        }

        return await response.json();
    }
}