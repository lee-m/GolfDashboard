import { useEditClubContext } from './edit-club-context';
import { FloatingLabelTextInput } from '../../components/floating-label-input';

export function EditClubDetails(props: any) {

    const context = useEditClubContext();

    return (
        <div className="edit-club-details">
            <FloatingLabelTextInput name="Name" label="Name" value={context.club?.name} onValueChange={context.updateClubName} />
            <FloatingLabelTextInput name="Website" label="Website" value={context.club?.website} onValueChange={context.updateClubWebsite} />
            <FloatingLabelTextInput name="Address" label="Address" value={context.club?.address} onValueChange={context.updateClubAddress} />
        </div>
    )
}