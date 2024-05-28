import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('myDatabase');

// Add a workout
const addWorkout = (title, desc, img, color, id_routine) => {
    try {
        db.runSync('INSERT INTO Workout (title, desc, img, color, id_routine) VALUES (?, ?, ?, ?, ?)', title, desc, img, color, id_routine);
    }
    catch (error) {
        console.error("Error adding workout:", error);
    }
}

// Update a workout
const updateWorkout = (id, new_title, new_desc, new_img, new_color) => {
    try {
        db.runSync('UPDATE Workout SET title = ?, desc = ?, img = ?, color = ? WHERE id_workout = ?', new_title, new_desc, new_img, new_color, id);
    }
    catch (error) {
        console.error("Error updating workout:", error);
    }
}

// Delete a workout
const deleteWorkout = (id) => {
    try {
        db.runSync('DELETE FROM Workout WHERE id_workout = ?', id);
    }
    catch (error) {
        console.error("Error deleting workout:", error);
    }
}

// Get a workout by id
const getWorkoutsById = (id) => {
    try {
        const allRows = db.getAllAsync('SELECT * FROM Workout WHERE id_routine = ?', id);

        return allRows
    } 
    catch (error) { 
        console.error("Error getting workout:", error);
    }
}

// const getWorkoutById = (id) => {
//     return new Promise((resolve, reject) => {
//         db.transaction(tx => {
//             tx.executeSql(
//                 "SELECT * FROM Workout WHERE id_routine = ?",
//                 [id],
//                 (_, { rows }) => {
//                     const workouts = rows._array;
//                     resolve(workouts); // Résoudre la promesse avec les données récupérées
//                 },
//                 (_, error) => {
//                     console.error("Error fetching workouts:", error);
//                     reject(error); // Rejeter la promesse en cas d'erreur
//                 }
//             );
//         });
//     });
// };

export { addWorkout, updateWorkout, deleteWorkout, getWorkoutsById }; 