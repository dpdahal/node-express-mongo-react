const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConfiguration = require('./config/connection');
const web = require('./router/web');
const app = express()
const port = 8000

//=========Connection Data base========
mongoose.Promise = global.Promise;
mongoose.connect(dbConfiguration.database, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database was connected')
}).catch(() => {
    console.log('Database was not connected');
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())


app.use('/', web);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
