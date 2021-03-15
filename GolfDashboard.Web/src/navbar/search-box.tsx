import React from "react";
import './search-box.css';

export class SearchBox extends React.Component {

    render() {
        return (
            <div className="search-container ml-5 p-1 rounded d-flex">
                <i className="bi bi-search text-white-tinted pl-1 align-self-center"></i>
                <input type="text" className="search-input pl-2 text-white-tinted align-self-center w-100" placeholder="Search" />
            </div>
        )
    }
}