import { Course } from ".";

export interface EditedClubDetails {
    id: number,
    name: string,
    website: string,
    address: string,
    courses: Course[]
}