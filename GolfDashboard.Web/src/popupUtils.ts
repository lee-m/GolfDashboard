import { toast } from 'react-toastify';

export class PopupUtils {

    public static infoToast(title: string) {

        toast.info(title, {
            closeButton: true
        });

    }

    public static errorToast(title: string) {

        toast.error(title, {
            closeButton: true,
            autoClose: false
        });

    }
}