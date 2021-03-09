import React from "react";
import { SearchBox } from "../components/search-box";
import { LoggedInUser } from "../components/logged-in-user";

import '../css/components/top-nav-bar.css'

export class TopNavBar extends React.Component {
    
    render() {
        return (
            <div className="container-fluid p-3 top-nav-bar">
                <span className="top-nav-title text-white-tinted align-self-center">Golf Dashboard</span>
                <div className="d-flex flex-grow-1 top-nav-bar-content justify-content-between">
                    <SearchBox />
                    <LoggedInUser />
                </div>
            </div>
        );
    }
}