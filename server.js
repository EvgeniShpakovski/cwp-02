const net = require('net');
const fs = require('fs');
const port = 3000;
let seed = 0;
const logger = fs.createWriteStream('client_id.txt');
const server = net.createServer((client) => {
    client.id = seed++;
    logger.write('client ' + client.id + ' connected\n');
    
    client.setEncoding('utf8');

    client.on('data', (data) => {
        if (data === 'QA') {
            client.write('ACK');
        }
        else{
            //client.write('DEC');
            logger.write(' data: ' + data);
            let ans = getRandom();
            logger.write('; answer: ' + ans + '\n');
            client.write(ans);
        }
    });

    client.on('end', () => {
        logger.write('client ' + client.id + ' disconnected\n');
    });
})

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});

function getRandom(){
    return Math.random() > 0.5 ? '1' : '0';
}