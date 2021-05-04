import { toast } from 'react-toastify';

export class PopupUtils {

    public static infoToast(title: string) {

        toast.info(title, {
            className: "bg-accent-green",
            closeButton: true
        });

    }

    public static errorToast(title: string) {

        toast.info(title, {
            className: "bg-accent-red",
            closeButton: true,
            autoClose: false
        });

    }
}