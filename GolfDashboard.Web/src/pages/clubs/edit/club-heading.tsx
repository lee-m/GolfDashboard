import { useHistory } from 'react-router-dom';
import Button from 'devextreme-react/button'

import { useClubsMutator } from '../clubs-hooks';
import { useEditClubContext } from './edit-club-context';

import ArrowBackIcon from '../../../images/arrow-back.svg';
import SaveIcon from '../../../images/save-white.svg';

export function ClubHeading(props: any) {

    const history = useHistory();
    const clubsMutator = useClubsMutator();
    const editContext = useEditClubContext();

    return (
        <div className="flex flex-row justify-between">
            <div className="flex">
                <Button
                    icon={ArrowBackIcon}
                    stylingMode="text"
                    hint="Back"
                    onClick={() => history.goBack()} />
                <span className="text-2xl">{editContext.club?.name}</span>
            </div>
            <Button
                icon={SaveIcon}
                text="Save"
                disabled={!editContext.saveEnabled}
                stylingMode="contained"
                type="default"
                onClick={() => clubsMutator.update(editContext.club!)} />
        </div>
    )
}