import { Exercise } from "./exercise.model";

export interface SessionExercise {
    id: number;
    session_id: number;
    exercise_id: number;
    order: number;
    exercise: Exercise;
}