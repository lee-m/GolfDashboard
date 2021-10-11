import { TeeBox } from './teeBox';

export interface Course {
    id: number;
    name: string;
    numberOfHoles: number;
    teeBoxes: TeeBox[];
}