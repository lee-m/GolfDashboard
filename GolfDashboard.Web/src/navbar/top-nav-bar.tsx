import { SearchBox } from "./search-box";
import { LoggedInUser } from "./logged-in-user";

import './top-nav-bar.css'

export function TopNavBar() {
    
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