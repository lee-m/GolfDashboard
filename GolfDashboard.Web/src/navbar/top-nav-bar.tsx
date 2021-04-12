import { SearchBox } from "./search-box";
import { LoggedInUser } from "./logged-in-user";

export function TopNavBar() {
    
    return (
        <div className="container-fluid p-3 navbar">
            <span className="navbar-title text-white-tinted align-self-center">Golf Dashboard</span>
            <div className="d-flex flex-grow-1 top-nav-bar-content justify-content-between">
                <SearchBox />
                <LoggedInUser />
            </div>
        </div>
    );

}