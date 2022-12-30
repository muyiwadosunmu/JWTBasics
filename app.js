require('dotenv').config();
require('express-async-errors');
const mongoose = require('mongoose');
const connectDB = require('./databases/connect');

const express = require('express')
const app = express()


const mainRouter =require('./routes/authRoute');
const notFoundMiddleware = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler');
const PORT = process.env.PORT || 3500

// Connect DB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.static('./public'));
app.use('/api/v1',mainRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);




mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});


