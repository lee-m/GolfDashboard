import * as React from 'react';
import PersonLogo from '../images/person.svg';

export class LoggedInUser extends React.Component {

    render() {
        return (
            <div className="pr-3 ml-auto d-flex">
                <img src={PersonLogo} alt="Person" width="20" />
                <p className="text-white-tinted pl-2 m-0 align-self-center">Lee</p>
            </div>
        );
    }
}