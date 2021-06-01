import { Course } from './course';

export interface GolfClub {
    id: number;
    name: string;
    address: string;
    website: string;
    distanceInMiles: number;
    courses: Array<Course>
}