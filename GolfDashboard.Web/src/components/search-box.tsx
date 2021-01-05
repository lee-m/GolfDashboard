import React from "react";
import '../css/components/search-box.css';

export class SearchBox extends React.Component {

    render() {
        return (
            <div className="search-container ml-5 p-1 rounded d-flex">
                <i className="bi bi-search text-white-tinted pl-1"></i>
                <input type="text" className="search-input pl-2 flex-grow-1 text-white-tinted" placeholder="Search" />
            </div>
        )
    }
}