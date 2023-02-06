import morgan from 'morgan';
import * as dotenv from 'dotenv'
import express from 'express';
import router from './routes/route';

const app = express();

// Configuring .env
dotenv.config();
// Logging
app.use(morgan('dev'));
// Parse the request
app.use(express.urlencoded({ extended: false }));
// Takes care of JSON data
app.use(express.json());

// RULES OF OUR API 
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

//Routes
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Server is operational!');
});

// Error handling 
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});