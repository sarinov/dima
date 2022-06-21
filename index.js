const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const routes = require(`./routes`);
const pages = require(`./routes/pages`);
const port = 5001;
const Response = require('./utils/ApiResponse')
const cors = require('cors')
const {getChatsList, getChatsListGroup} = require('./controllers/messages')

const socketOptions = {
    allowEIO3: true,
    cors: {
        origin: [ '*', 'http://localhost:5001' ],
        methods: [ 'GET', 'POST', 'OPTIONS' ],
        allowedHeaders: 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range',
    }
};


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

const server = app.listen(port, ()=> {
    console.log(`Server listen: ${port} port`)
})



const io = require("socket.io")(server, socketOptions);

app.set('io', io);

io.on("connection", async (socket) => {   
    console.log(socket.handshake.query.id)
    const {id} = socket.handshake.query;
    const chats = await getChatsList(id)
    const groups = await getChatsListGroup(id)

    socket.join(`user_${id}`);
    for (const chat of chats) {
        socket.join(`chat_${chat.chatId}`);
    }
    for (const group of groups) {
        socket.join(`group_${group.groupId}`);
    }
});