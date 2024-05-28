import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('myDatabase');

// Add an exercise to a workout
const addExerciseToWorkout = (id_exercise, id_workout, new_goal, new_rest, new_comment) => {
    try {
        db.runSync('INSERT INTO Workout_Exercise (id_workout, id_exercise, goal, rest, comment) VALUES (?, ?, ?, ?, ?)', id_exercise, id_workout, new_goal, new_rest, new_comment);
    }
    catch (error) {
        console.error("Error adding exercise to a workout:", error);
    }
}

// Update an exercise from a workout
const updateExerciseToWorkout = (id_exercise, id_workout, new_goal, new_rest, new_comment) => {
    try {
        db.runSync(`
            UPDATE Workout_Exercise 
            SET goal = ?, rest = ?, comment = ? 
            WHERE id_exercise = ? AND id_workout = ?`,
            new_goal, new_rest, new_comment, id_exercise, id_workout
        );
    }
    catch (error) {
        console.error("Error updating exercise from a workout:", error);
    }
}

// Delete an exercise from a workout
const deleteExerciseFromWorkout = (id) => {
    try {
        db.runSync('DELETE FROM Workout_Exercise WHERE id_exercise = ?', id);
    }
    catch (error) {
        console.error("Error deleting exercise from a workout:", error);
    }
}

// Get all exercises by a workout id
const getExercisesByWorkoutId = (id) => {
    try {
        const allRows = db.getAllAsync(`
            SELECT we.*, E.id_exercise, E.title, E.desc, E.img, E.type
            FROM Exercise E
            INNER JOIN Workout_Exercise WE ON E.id_exercise = WE.id_exercise
            WHERE WE.id_workout = ?`, 
            id
        );

        return allRows
    } 
    catch (error) { 
        console.error("Error getting exercises from a workout:", error);
    }
}

export { addExerciseToWorkout, updateExerciseToWorkout, deleteExerciseFromWorkout, getExercisesByWorkoutId }; 