import { LoggedInUser } from "./logged-in-user";

export function TopNavBar() {

    return (
        <div className="navbar flex p-5 bg-primary-800">
            <span className="text-2xl text-white self-center opacity-90">Golf Dashboard</span>
            <div className="flex flex-grow top-nav-bar-content justify-between">
                <LoggedInUser />
            </div>
        </div>
    );

}