import { LoggedInUser } from "./logged-in-user";

export function TopNavBar() {
    
    return (
        <div className="navbar flex p-5">
            <span className="text-2xl text-white self-center">Golf Dashboard</span>
            <div className="flex flex-grow top-nav-bar-content justify-between">
                <LoggedInUser />
            </div>
        </div>
    );

}