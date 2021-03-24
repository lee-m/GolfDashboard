import { Note, Tag } from '../models';
import { ServiceBase } from './serviceBase';

export class NotesService extends ServiceBase {

    async getTags(): Promise<Array<Tag>> {
        return await this.getResponseJSON<Array<Tag>>("/tags");
    }

    async getNotes(): Promise<Array<Note>> {
        return await this.getResponseJSON<Array<Note>>("/note");
    }

    async saveNewNote(note: Note): Promise<boolean> {

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
}