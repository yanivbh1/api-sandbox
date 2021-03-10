const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000

app.post('/test', (req, res) => {
    console.log("Something arrived")
    console.log("req.hostname: ",req.hostname)
    console.log("req.originalUrl: ", req.originalUrl)
    console.log("req.headers: ", req.headers)
    console.log("req.body: ", req.body)
    console.log("req.cookies: ",req.cookies)
    console.log("req.rawHeaders: ", req.rawHeaders)
    console.log(req.baseUrl)
    res.status(200).json({
        status: 200,
        message: `Hey`,
        data: null
    })
});

app.listen(PORT, () => {
    console.log(`Listenning on port ${PORT}`)
});