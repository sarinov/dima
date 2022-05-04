const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const routes = require(`./routes`);
const pages = require(`./routes/pages`);
const port = 5001;
const Response = require('./utils/ApiResponse')
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(cors())

app.use('/api', routes);

app.use(pages);

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


app.get('/', async (req, res) => {

    console.log(req.body)
    res.send('ok');
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json(new Response().error({
        message: err.message,
        stack: err.stack
    }));
})

app.listen(port, ()=> {
    console.log(`Server listen: ${port} port`)
})
