const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express()

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Forum Photo API",
            version: "1.0.0",
            description: "API for managing photos, users, and competitions"
        },
        servers: [
            {
                url: "http://localhost:8000"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./routes/*.js"]
};

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('database connected'))
.catch((err)=> console.log('database not connected',err))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use('/auth',require('./routes/authRoutes'))
app.use('/photo',require('./routes/photoRoutes'))
app.use('/course',require('./routes/courseRoutes'))
app.use('/competition',require('./routes/competitionRoutes'))
app.use('/uploads', express.static('uploads'));

const port = 8000
app.listen(port,()=> console.log('Server is running'))