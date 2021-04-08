import { ConfirmDialogArgs, Dialog, DialogUtility } from '@syncfusion/ej2-react-popups';
import { toast } from 'react-toastify';

export class PopupUtils {

    public static infoToast(title: string) {

        toast.info(title, {
            className: "toast-info-background",
            closeButton: false
        });

    }

    public static errorToast(title: string) {

        toast.info(title, {
            className: "toast-error-background",
            closeButton: false,
        });

    }

    public static showConfirmationDialog(args: ConfirmDialogArgs):  Dialog {

        let confirmDialog = DialogUtility.confirm({
            animationSettings: { effect: 'Fade' },
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