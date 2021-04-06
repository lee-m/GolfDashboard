import { ChipModel, DeleteEventArgs } from '@syncfusion/ej2-react-buttons';
import { ConfirmDialogArgs, Dialog, DialogUtility } from '@syncfusion/ej2-react-popups';

import { APIService } from '../../services';
import { NotesContextState } from './notes-context';

export class NotesPageController {

    private _apiService: APIService;
    private _notesContext: NotesContextState;

    constructor(notesContext: NotesContextState) {
        this._apiService = new APIService();
        this._notesContext = notesContext;
    }

    confirmTagDeletion(e: DeleteEventArgs | undefined) : void {

        if(e) {

            e.cancel = true;

            let tagModel = e.data as ChipModel;
            let tagID = tagModel.value as number;

            let confirmDialog = this.showConfirmationDialog({
                content: `The tag '${tagModel.text}' will be deleted and removed from any notes currently using it. Do you wish to continue?`,
                okButton: { 
                    text: 'OK', 
                    click: async () => {
                        this.deleteTag(tagID);
                        confirmDialog.close();
                    }
                },
                title: "Confirm Tag Deletion",
            });

        }

    }

    confirmNoteDeletion(noteID: number): void {

        const dialog = this.showConfirmationDialog({
            content: "This note will be deleted. Do you wish to continue?",
            title: "Confirm Note Deletion",
            okButton: { 
                text: 'OK', 
                click: async () => {
                    this._notesContext.markNoteAsDeleted(noteID);
                    this._apiService.deleteNote(noteID);
                    dialog.close();
                }
            }
        });

    }

    private async deleteTag(tagID: number) {

        if(await this._apiService.deleteTag(tagID)) {

            //Deleting a tag can update notes if that tag was removed from it so we need to refresh 
            //the notes
            this._notesContext.updateTags(this._notesContext.tags.filter(t => t.id !== tagID))
            this._notesContext.updateNotes(await this._apiService.getNotes());
        }
    }

    private showConfirmationDialog(args: ConfirmDialogArgs):  Dialog {

        let confirmDialog = DialogUtility.confirm({
            animationSettings: { effect: 'FadeZoom' },
            closeOnEscape: true,
            showCloseIcon: true,
            ...args
        });

        //Want the dialog to fade out as it's closing
        confirmDialog.beforeClose = () => {
            let overlay = confirmDialog.element!.parentElement!.querySelector(".e-dlg-overlay")!;
            overlay.classList.add("e-fade");
        }

        return confirmDialog;
    }
}