import { useParams } from 'react-router-dom';

interface EditClubPageURLParameters {
    clubID?: string
}

export function EditClubPage(props: any) {

    const params: EditClubPageURLParameters = useParams();

    return (
        <h1>{params.clubID!}</h1>
    );
}