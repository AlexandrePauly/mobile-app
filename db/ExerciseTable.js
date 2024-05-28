import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('myDatabase');

// Add an exercise
const addExercise = (title, desc, img, muscle_id, type) => {
    try {
        // Pre-processing : muscle_id is an object and we need a number
        id_muscle = muscle_id.id_muscle

        db.runSync('INSERT INTO Exercise (title, desc, img, muscle_id, type) VALUES (?, ?, ?, ?, ?)', title, desc, img, id_muscle, type);
    }
    catch (error) {
        console.error("Error adding exercise:", error);
    }
}

// Update an exercise
const updateExercise = (id, new_title, new_desc, new_img, new_muscle_id, new_type) => {
    try {
        // Pre-processing : muscle_id is an object and we need a number
        id_muscle = new_muscle_id.id_muscle

        db.runSync('UPDATE Exercise SET title = ?, desc = ?, img = ?, muscle_id = ?, type = ? WHERE id_exercise = ?', new_title, new_desc, new_img, id_muscle, new_type, id);
    }
    catch (error) {
        console.error("Error updating exercise:", error);
    }
}

// Delete an exercise
const deleteExercise = (id) => {
    try {
        db.runSync('DELETE FROM Exercise WHERE id_exercise = ?', id);
    }
    catch (error) {
        console.error("Error deleting exercise:", error);
    }
}

// Get all exercises
const getExercises = () => {
    try {
        const allRows = db.getAllSync('SELECT * FROM Exercise');

        return allRows
    }
    catch (error) {
        console.error("Error getting exercises:", error);
    }
}

// Get an exercise by id
const getExerciseById = (id_exercise) => {
    try {
        const row = db.getFirstSync('SELECT * FROM Exercise WHERE id_exercise = ?', id_exercise);

        return row
    }
    catch (error) {
        console.error("Error getting exercise:", error);
    }
}

// Get all exercises
const getExercisesAsync = () => {
    try {
        const allRows = db.getAllAsync('SELECT * FROM Exercise');

        return allRows
    }
    catch (error) {
        console.error("Error getting exercises:", error);
    }
}

const clearExerciseTable = () => {
    try {
        db.runSync('DELETE FROM Exercise');
    }
    catch (error) {
        console.error("Error deleting all exercises:", error);
    }
}

export { getExercises, getExerciseById, getExercisesAsync, addExercise, updateExercise, deleteExercise, clearExerciseTable };