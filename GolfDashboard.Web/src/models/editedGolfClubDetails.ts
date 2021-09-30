import { Course } from ".";

export interface EditedGolfClubDetails {
    id: number,
    name: string,
    website: string,
    address: string,
    courses: Course[]
}