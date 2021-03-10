const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({ credentials: true, origin: allowedOrigins }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(404).json({
        status: 200,
        message: `Hey`,
        data: null
    })
});

app.listen(PORT, () => {
    console.log(`Listenning on port ${PORT}`)
});