const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const routes = require(`./routes`);
const port = 5001;
const Response = require('./utils/ApiResponse')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(routes);



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




