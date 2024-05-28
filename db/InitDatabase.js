import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('myDatabase');

const initDatabase = () => {
    // Table Routine
    try {
        // Creating routine table
        db.execSync(`
            CREATE TABLE IF NOT EXISTS Routine (
                id_routine INTEGER PRIMARY KEY NOT NULL, 
                title TEXT NOT NULL, 
                desc TEXT NOT NULL, 
                img TEXT NOT NULL, 
                color TEXT NOT NULL
            );
        `);

        console.log("Table 'Routine' created successfully");
    
        // Count the number of row is the database
        const nb_row = db.getFirstSync('SELECT COUNT(*) AS count FROM Routine');

        // If the database is empty, add default muscles
        if (nb_row.count === 0) {
            addDefaultRoutines();
        }
    }
    catch (error) {
        console.error("Error initializing table Routine:", error);
    }

    // Table Workout
    try {
        // Creating workout table
        db.execSync(`
            CREATE TABLE IF NOT EXISTS Workout (
                id_workout INTEGER PRIMARY KEY NOT NULL, 
                title TEXT NOT NULL, 
                desc TEXT NOT NULL, 
                img TEXT NOT NULL,
                color TEXT NOT NULL,
                id_routine INTEGER NOT NULL,  
            FOREIGN KEY (id_routine) REFERENCES Routine(id_routine));
        `);

        console.log("Table 'Workout' created successfully");
    
        // Count the number of row is the database
        const nb_row = db.getFirstSync('SELECT COUNT(*) AS count FROM Workout');

        // If the database is empty, add default muscles
        if (nb_row.count === 0) {
            addDefaultWorkouts();
        }
    }
    catch (error) {
        console.error("Error initializing table Workout:", error);
    }

    // Table Workout_Exercise
    try {
        // Creating Workout_Exercise table
        db.execSync(`
            CREATE TABLE IF NOT EXISTS Workout_Exercise (
                id_workout INTEGER NOT NULL, 
                id_exercise INTEGER NOT NULL, 
                goal TEXT, 
                rest INTEGER, 
                comment TEXT,
                PRIMARY KEY (id_workout, id_exercise),
                FOREIGN KEY (id_workout) REFERENCES Workout(id_workout),
                FOREIGN KEY (id_exercise) REFERENCES Exercise(id_exercise)
            );
        `);

        console.log("Table 'Workout_Exercise' created successfully");
    
        // Count the number of row is the database
        const nb_row = db.getFirstSync('SELECT COUNT(*) AS count FROM Workout_Exercise');

        // If the database is empty, add default muscles
        if (nb_row.count === 0) {
            addDefaultWorkoutExercises();
        }
    }
    catch (error) {
        console.error("Error initializing table Workout_Exercise:", error);
    }

    // Table Workout_Exercise_Set
    try {
        // Creating Workout_Exercise_Set table
        db.execSync(`
            CREATE TABLE IF NOT EXISTS Workout_Exercise_Set (
                id_set INTEGER PRIMARY KEY NOT NULL, 
                id_workout INTEGER NOT NULL,
                id_exercise INTEGER NOT NULL, 
                date DATE, 
                nb_reps INTEGER, 
                weight FLOAT,
                FOREIGN KEY (id_workout) REFERENCES Workout_Exercise(id_workout),
                FOREIGN KEY (id_exercise) REFERENCES Workout_Exercise(id_exercise)
            );
        `);

        console.log("Table 'Workout_Exercise_Set' created successfully");
    
        // Count the number of row is the database
        const nb_row = db.getFirstSync('SELECT COUNT(*) AS count FROM Workout_Exercise_Set');

        // If the database is empty, add default sets
        if (nb_row.count === 0) {
            addDefaultSets();
        }
    }
    catch (error) {
        console.error("Error initializing table Workout_Exercise_Set:", error);
    }

    // Table Muscle
    try {
        // Creating muscle table
        db.execSync(`
            CREATE TABLE IF NOT EXISTS Muscle (
                id_muscle INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                img TEXT NOT NULL
            );
        `);

        console.log("Table 'Muscle' created successfully");
 
        // Count the number of row is the database
        const nb_row = db.getFirstSync('SELECT COUNT(*) AS count FROM Muscle');

        // If the database is empty, add default muscles
        if (nb_row.count === 0) {
            addDefaultMuscles();
        }
    }
    catch (error) {
        console.error("Error initializing table Muscle:", error);
    }

    // Table Exercise
    try {
        // Creating muscle table
        db.execSync(`
            CREATE TABLE IF NOT EXISTS Exercise (
                id_exercise INTEGER PRIMARY KEY NOT NULL, 
                title TEXT NOT NULL,
                desc TEXT,
                img TEXT,
                muscle_id INTEGER NOT NULL,
                type TEXT NOT NULL, 
            FOREIGN KEY (muscle_id) REFERENCES Muscle(id_muscle));
        `);

        console.log("Table 'Exercise' created successfully");
 
        // Count the number of row is the database
        const nb_row = db.getFirstSync('SELECT COUNT(*) AS count FROM Exercise');

        // If the database is empty, add default exercises
        if (nb_row.count === 0) {
            addDefaultExercises();
        }
    }
    catch (error) {
        console.error("Error initializing table Muscle:", error);
    }
};

// Function to add all default routines
const addDefaultRoutines = () => {
    // Default routines
    const defaultRoutines = [
        ["Routine 1", "Lorem ipsum", "R", "lightgray"],
        ["Routine 2", "Lorem ipsum", "R", "lightgray"],
        ["Routine 3", "Lorem ipsum", "R", "lightgray"],
        ["Routine 4", "Lorem ipsum", "R", "lightgray"],
    ];

    // For each routine, add the row
    for (const routine of defaultRoutines) {
        // Adding routines
        db.runSync(
            "INSERT INTO Routine (title, desc, img, color) VALUES (?, ?, ?, ?)",
            routine
        );

        console.log("Default routine added successfully");
    }
}

// Function to add all default workouts
const addDefaultWorkouts = () => {
    // Default workouts
    const defaultWorkouts = [
        ["Program from April to June", "Lorem ipsum", "P", "green", 1],
        ["Day 1 - Back & Biceps", "Lorem ipsum", "D", "lightgray", 1],
        ["Day 2 - Legs", "Lorem ipsum", "D", "lightgray", 1],
        ["Day 3 - Shoulders & Abs", "Lorem ipsum", "D", "lightgray", 1],
        ["Day 4 - Legs", "Lorem ipsum", "D", "lightgray", 1],
        ["Day 5 - Chest & triceps", "Lorem ipsum", "D", "lightgray", 1],
        ["Program from January to March", "Lorem ipsum", "P", "green", 1],
        ["Day 1 - Back & Biceps", "Lorem ipsum", "D", "lightgray", 1],
        ["Day 2 - Legs", "Lorem ipsum", "D", "lightgray", 1],
        ["Day 3 - Shoulders & Abs", "Lorem ipsum", "D", "lightgray", 1],
        ["Day 4 - Legs", "Lorem ipsum", "D", "lightgray", 1],
        ["Day 5 - Chest & triceps", "Lorem ipsum", "D", "lightgray", 1],
        ["Day 1 - Back & Biceps", "Lorem ipsum", "D", "lightgray", 2],
        ["Day 2 - Legs", "Lorem ipsum", "D", "lightgray", 2],
        ["Day 3 - Shoulders & Abs", "Lorem ipsum", "D", "lightgray", 2],
        ["Day 4 - Legs", "Lorem ipsum", "D", "lightgray", 2],
        ["Day 5 - Chest & triceps", "Lorem ipsum", "D", "lightgray", 2],
        ["Day 1 - Back & Biceps", "Lorem ipsum", "D", "lightgray", 3],
        ["Day 2 - Legs", "Lorem ipsum", "D", "lightgray", 3],
        ["Day 3 - Shoulders & Abs", "Lorem ipsum", "D", "lightgray", 3],
        ["Day 4 - Legs", "Lorem ipsum", "D", "lightgray", 3],
        ["Day 5 - Chest & triceps", "Lorem ipsum", "D", "lightgray", 3],
        ["Day 1 - Back & Biceps", "Lorem ipsum", "D", "lightgray", 4],
        ["Day 2 - Legs", "Lorem ipsum", "D", "lightgray", 4],
        ["Day 3 - Shoulders & Abs", "Lorem ipsum", "D", "lightgray", 4],
        ["Day 4 - Legs", "Lorem ipsum", "D", "lightgray", 4],
        ["Day 5 - Chest & triceps", "Lorem ipsum", "D", "lightgray", 4],
    ];

    // For each workout, add the row
    for (const workout of defaultWorkouts) {
        // Adding routines
        db.runSync(
            "INSERT INTO Workout (title, desc, img, color, id_routine) VALUES (?, ?, ?, ?, ?)",
            workout
        );

        console.log("Default workout added successfully");
    }
}

// Function to add all default workouts_exercises
const addDefaultWorkoutExercises = () => {
    // Default workouts_exercises
    const defaultValues = [
        [2, 21, '3 x 10 reps', 60, 'Comment example'],
        [2, 17, '3 x 10 reps', 90, 'Comment example'],
        [2, 14, '3 x 10 reps', 90, 'Comment example'],
        [2, 31, '3 x 10 reps', 90, 'Comment example'],
    ];

    // For each workout_exercise, add the row
    for (const workout of defaultValues) {
        // Adding workout_exercise
        db.runSync(
            "INSERT INTO Workout_Exercise (id_workout, id_exercise, goal, rest, comment) VALUES (?, ?, ?, ?, ?)",
            workout
        );

        console.log("Default workout_exercise added successfully");
    }
};

// Function to add all default sets
const addDefaultSets = () => {
    // Default sets
    const defaultSets = [
        [2, 21, '2024-05-14', 8, 100],
        [2, 21, '2024-05-14', 8, 100],
        [2, 21, '2024-05-14', 7, 95],
        [2, 21, '2024-05-14', 6, 95],
        [2, 21, '2024-05-07', 8, 95],
        [2, 21, '2024-05-07', 8, 95],
        [2, 21, '2024-05-07', 8, 95],
        [2, 21, '2024-05-07', 8, 95],
        [2, 17, '2024-05-14', 8, 15],
        [2, 14, '2024-05-14', 7, 23],
        [2, 31, '2024-05-14', 7, 59],
    ];

    // For each set, add the row
    for (const set of defaultSets) {
        // Adding muscles
        db.runSync(
            "INSERT INTO Workout_Exercise_Set (id_workout, id_exercise, date, nb_reps, weight) VALUES (?, ?, ?, ?, ?)",
            set
        );

        console.log("Default set added successfully");
    }
}

// Function to add all default exercises
const addDefaultMuscles = () => {
    // Default muscles
    const defaultMuscles = [
        ["Abs", "abs"],
        ["Biceps", "biceps"],
        ["Back", "back"],
        ["Chest", "chest"],
        ["Legs", "legs"],
        ["Shoulders", "shoulders"],
        ["Triceps", "triceps"],
        ["others", "others"],
    ];

    // For each muscle, add the row
    for (const muscle of defaultMuscles) {
        // Adding muscles
        db.runSync(
            "INSERT INTO Muscle (title, img) VALUES (?, ?)",
            muscle[0], muscle[1]
        );

        console.log("Default muscle added successfully");
    }
}

// Function to add all default exercises
const addDefaultExercises = () => {
    // Default exercises
    const defaultExercises = [
        ["Abs exercise 1", "Lorem ipsum", "exercises", 1, "Weights and reps"],
        ["Abs exercise 2", "Lorem ipsum", "exercises", 1, "Weights and reps"],
        ["Abs exercise 3", "Lorem ipsum", "exercises", 1, "Weights and reps"],
        ["Abs exercise 4", "Lorem ipsum", "exercises", 1, "Weights and reps"],
        ["Abs exercise 5", "Lorem ipsum", "exercises", 1, "Time"],
        ["Abs exercise 6", "Lorem ipsum", "exercises", 1, "Time"],

        ["Back exercise 1", "Lorem ipsum", "exercises", 2, "Weights and reps"],
        ["Back exercise 2", "Lorem ipsum", "exercises", 2, "Weights and reps"],
        ["Back exercise 3", "Lorem ipsum", "exercises", 2, "Weights and reps"],
        ["Back exercise 4", "Lorem ipsum", "exercises", 2, "Weights and reps"],
        ["Back exercise 5", "Lorem ipsum", "exercises", 2, "Time"],
        ["Back exercise 6", "Lorem ipsum", "exercises", 2, "Time"],

        ["Biceps exercise 1", "Lorem ipsum", "exercises", 3, "Weights and reps"],
        ["Biceps exercise 2", "Lorem ipsum", "exercises", 3, "Weights and reps"],
        ["Biceps exercise 3", "Lorem ipsum", "exercises", 3, "Weights and reps"],
        ["Biceps exercise 4", "Lorem ipsum", "exercises", 3, "Weights and reps"],
        ["Biceps exercise 5", "Lorem ipsum", "exercises", 3, "Time"],
        ["Biceps exercise 6", "Lorem ipsum", "exercises", 3, "Time"],

        ["Chest exercise 1", "Lorem ipsum", "exercises", 4, "Weights and reps"],
        ["Chest exercise 2", "Lorem ipsum", "exercises", 4, "Weights and reps"],
        ["Chest exercise 3", "Lorem ipsum", "exercises", 4, "Weights and reps"],
        ["Chest exercise 4", "Lorem ipsum", "exercises", 4, "Weights and reps"],
        ["Chest exercise 5", "Lorem ipsum", "exercises", 4, "Time"],
        ["Chest exercise 6", "Lorem ipsum", "exercises", 4, "Time"],

        ["Legs exercise 1", "Lorem ipsum", "exercises", 5, "Weights and reps"],
        ["Legs exercise 2", "Lorem ipsum", "exercises", 5, "Weights and reps"],
        ["Legs exercise 3", "Lorem ipsum", "exercises", 5, "Weights and reps"],
        ["Legs exercise 4", "Lorem ipsum", "exercises", 5, "Weights and reps"],
        ["Legs exercise 5", "Lorem ipsum", "exercises", 5, "Time"],
        ["Legs exercise 6", "Lorem ipsum", "exercises", 5, "Time"],

        ["Shoulders exercise 1", "Lorem ipsum", "exercises", 6, "Weights and reps"],
        ["Shoulders exercise 2", "Lorem ipsum", "exercises", 6, "Weights and reps"],
        ["Shoulders exercise 3", "Lorem ipsum", "exercises", 6, "Weights and reps"],
        ["Shoulders exercise 4", "Lorem ipsum", "exercises", 6, "Weights and reps"],
        ["Shoulders exercise 5", "Lorem ipsum", "exercises", 6, "Time"],
        ["Shoulders exercise 6", "Lorem ipsum", "exercises", 6, "Time"],

        ["Triceps exercise 1", "Lorem ipsum", "exercises", 7, "Weights and reps"],
        ["Triceps exercise 2", "Lorem ipsum", "exercises", 7, "Weights and reps"],
        ["Triceps exercise 3", "Lorem ipsum", "exercises", 7, "Weights and reps"],
        ["Triceps exercise 4", "Lorem ipsum", "exercises", 7, "Weights and reps"],
        ["Triceps exercise 5", "Lorem ipsum", "exercises", 7, "Time"],
        ["Triceps exercise 6", "Lorem ipsum", "exercises", 7, "Time"],

        ["Others exercise 1", "Lorem ipsum", "exercises", 8, "Weights and reps"],
        ["Others exercise 2", "Lorem ipsum", "exercises", 8, "Weights and reps"],
        ["Others exercise 3", "Lorem ipsum", "exercises", 8, "Weights and reps"],
        ["Others exercise 4", "Lorem ipsum", "exercises", 8, "Weights and reps"],
        ["Others exercise 5", "Lorem ipsum", "exercises", 8, "Time"],
        ["Others exercise 6", "Lorem ipsum", "exercises", 8, "Time"],
    ];

    // For each exercise, add the row
    for (const exercise of defaultExercises) {
        // Adding exercises
        db.runSync(
            "INSERT INTO Exercise (title, desc, img, muscle_id, type) VALUES (?, ?, ?, ?, ?)",
           exercise
        );
 
        console.log("Default exercise added successfully");
    }
}

export { initDatabase };