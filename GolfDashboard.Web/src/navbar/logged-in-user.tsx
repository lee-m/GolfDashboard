import PersonLogo from '../images/person.svg';

export function LoggedInUser() {

    return (
        <div className="pr-3 ml-auto flex">
            <img src={PersonLogo} alt="Person" width="20" className="opacity-89" />
            <p className="text-white pl-2 m-0 self-center opacity-90">Lee</p>
        </div>
    );

}