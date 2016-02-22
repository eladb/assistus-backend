const Bot  = require('slackbots');


var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 5000 });

function after(timeout, callback) {
  setTimeout(callback, timeout);
}

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', data => {
    console.log('received: %s', data);
    const incoming = JSON.parse(data);
    if (incoming.type === 'text') {
      after(1000, () => {
        console.log('Sending a "typing" message');
        ws.send(JSON.stringify({
          type: 'typing',
          user_id: 'assistos',
          user_display_name: 'Assistos"'
        }));

        after(2000, () => {
          console.log('Sending a text message');
          ws.send(JSON.stringify({
            type: 'text',
            user_id: 'assistos',
            user_display_name: 'Assistos',
            text: `${incoming.user_display_name}, you said "${incoming.text}"! Haha very funny...`
          }));
        })
      });
    }
  });

  ws.send('something');
});

console.log('Listening on 5000');

/*
const bot = new Bot({
    token: 'xoxb-22394012005-Srn1QRJixNgIVhe3qGi0BYJh',
    name: 'George'
});

bot.on('start', () => {
    console.log('Posting message to channel');
    bot.postMessageToChannel('general', 'Hello, world');
});

bot.on('message', data => {
    console.log(data);
    if (data.type === 'message') {
        bot.postMessageToChannel(data.channel, data.text);
    }
});

bot.on('error', err => {
    console.error(err);
});
*/
