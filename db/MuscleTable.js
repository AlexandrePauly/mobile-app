import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('myDatabase');

// Get all muscles
const getMuscles = () => {
    try {
        const allRows = db.getAllSync('SELECT * FROM Muscle');

        return allRows
    }
    catch (error) {
        console.error("Error getting muscles:", error);
    }
}

// Get all muscles
const getMusclesAsync = () => {
    try {
        const allRows = db.getAllAsync('SELECT * FROM Muscle');

        return allRows
    }
    catch (error) {
        console.error("Error getting muscles:", error);
    }
}

// Get a muscle by name
const getMuscleByName = (muscleName) => {
    try {
        const row = db.getFirstSync(`
            SELECT id_muscle
            FROM Muscle
            WHERE title == ?
        `, muscleName
        );

        return row
    }
    catch (error) {
        console.error("Error getting muscle:", error);
    }
}

export { getMuscles, getMusclesAsync, getMuscleByName };