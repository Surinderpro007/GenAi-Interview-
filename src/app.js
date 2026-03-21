const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

try {
    const { DOMMatrix } = require('canvas');
    global.DOMMatrix = DOMMatrix;
} catch(e) {
    console.log('Canvas not available:', e.message);
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || 
            origin.endsWith('.vercel.app') || 
            origin === 'http://localhost:5173') {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes')

app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

module.exports = app;