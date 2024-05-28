import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('myDatabase');

// Add a set
const addSet = (id_workout, id_exercise, date, nb_reps, weight) => {
    try {
        db.runSync('INSERT INTO Workout_Exercise_Set (id_workout, id_exercise, date, nb_reps, weight) VALUES (?, ?, ?, ?, ?)', id_workout, id_exercise, date, nb_reps, weight);
    }
    catch (error) {
        console.error("Error adding set:", error);
    }
}

// Update a set
const updateSet = (id, new_nb_reps, new_weight) => {
    try {
        db.runSync('UPDATE Workout_Exercise_Set SET nb_reps = ?, weight = ? WHERE id_set = ?', new_nb_reps, new_weight, id);
    }
    catch (error) {
        console.error("Error updating set:", error);
    }
}

// Delete a set
const deleteSet = (id) => {
    try {
        db.runSync('DELETE FROM Workout_Exercise_Set WHERE id_set = ?', id);
    }
    catch (error) {
        console.error("Error deleting set:", error);
    }
}

// Get all sets for an exercise from a workout
const getExerciseWorkoutSets = (id_workout, id_exercise) => {
    try {
        const allRows = db.getAllAsync(`
            SELECT * FROM Workout_Exercise_Set 
            WHERE id_workout = ? AND id_exercise = ?`, 
            id_workout, id_exercise
        );

        return allRows
    }
    catch (error) {
        console.error("Error getting sets:", error);
    }
}

export { getExerciseWorkoutSets, addSet, updateSet, deleteSet };