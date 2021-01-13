if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs'); 

// app.use((req, res, next) => {
//     const allowedOrigins = ['http://localhost:3000', 'http://localhost:4000', 'http://127.0.0.1:3000'];
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//          res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
//     res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Credentials', true);
//     return next();
//   });
app.use(cors())

mongoose.connect(process.env.MONGOOSE_NET_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    }).then(() => console.log('DB Connected'))
        .catch(err => console.log('Err connecting to DB'))

app.use(express.static(path.join(__dirname, 'web/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/web/build/index.html'))
})

const storyRouter = require('./Routes/stories');
const userRouter = require('./Routes/user');
const verification = require('./Routes/verification')

app.use('/api/story', storyRouter)
app.use('/api/user', userRouter)
app.use('/api/', verification)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})