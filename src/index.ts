import express from 'express';
import { create, CreateOptions, Whatsapp } from 'venom-bot';

const app = express();
const port = 8080; // default port to listen

const createOptions: CreateOptions = {
    session: 'happy-all-session'
};

create(createOptions).then((client: Whatsapp) => start(client));

function start(client: Whatsapp) {
    client.onMessage((message) => {
        if (message.body === 'Hi') {
            client.sendText(message.from, '👋 Hello!').then((result) => {
                console.log('Sent hello from node'); // return object success
            }).catch((erro) => {
                console.error('Error when sending: ', erro); // return object error
            });
        }
    });
}

// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello world!');
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
