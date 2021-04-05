import { ChipModel, DeleteEventArgs } from '@syncfusion/ej2-react-buttons';

import { Note, Tag } from '../models';
import { ServiceBase } from './serviceBase';

export class NotesService extends ServiceBase {

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


    beforeTagDeleted(e: DeleteEventArgs | undefined) : void {

        /*
        if(e) {

            e.cancel = true;

            let tagModel = e.data as ChipModel;

            this._confirmationDialog?.show({
                content: `The tag '${tagModel.text}' will be deleted and removed from any notes currently using it. Do you wish to continue?`,
                title: "Confirm Tag Deletion",
                width: "24%",
                primaryButtonText: "Delete",
                primaryButtonClick: async () => {
                    await this.deleteTag(tagModel.value as number);
                    //this.refresh();
                }
            });

        }
        */

    }
}