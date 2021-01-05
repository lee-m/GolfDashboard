import React from "react";
import { SearchBox } from "../components/search-box";

import '../css/components/top-nav-bar.css'

export class TopNavBar extends React.Component {
    
    render() {
        return (
            <div className="container-fluid p-3 d-flex">
                <span className="top-nav-title text-white-tinted align-self-center">Golf Dashboard</span>
                <SearchBox />
            </div>
        );
    }
}