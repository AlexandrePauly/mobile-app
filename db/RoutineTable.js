import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('myDatabase');

// Add a routine
const addRoutine = (title, desc, img, color) => {
    try {
        db.runSync('INSERT INTO Routine (title, desc, img, color) VALUES (?, ?, ?, ?)', title, desc, img, color);
    }
    catch (error) {
        console.error("Error adding routine:", error);
    }
}

// Update a routine
const updateRoutine = (id, new_title, new_desc, new_img, new_color) => {
    try {
        db.runSync('UPDATE Routine SET title = ?, desc = ?, img = ?, color = ? WHERE id_routine = ?', new_title, new_desc, new_img, new_color, id);
    }
    catch (error) {
        console.error("Error updating routine:", error);
    }
}

// Delete a routine
const deleteRoutine = (id) => {
    try {
        db.runSync('DELETE FROM Routine WHERE id_routine = ?', id);
    }
    catch (error) {
        console.error("Error deleting routine:", error);
    }
}

// Get all routines
const getRoutines = () => {
    try {
        const allRows = db.getAllSync('SELECT * FROM Routine');

        return allRows
    }
    catch (error) {
        console.error("Error getting routines:", error);
    }
}

export { addRoutine, deleteRoutine, updateRoutine, getRoutines };