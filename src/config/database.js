import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)

        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log('Database is Connected');
        })

        connection.on('error', (err) => {
            console.log(`MongoDB connection error: ${err}`);
            process.exit();
        })

    } catch (err) {
        console.log('DB: Something Goes wrong' + err);
    }
}
