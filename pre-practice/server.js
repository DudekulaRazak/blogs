const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res)=>{
    // console.log(req.url, req.method);


    //lodash
    const num = _.random(0,20);
    console.log(num);

    const greet = _.once(() =>{
        console.log('hello');
    });

    greet();
    greet();

    //set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';

    switch(req.url) {
        case '/' :
            path+= 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path+= 'about.html';
            res.statusCode = 200;
            break;
        case '/aboutme':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path+= '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err,data) => {
        if(err) {
            console.log(err);
            res.end();
        }
        else {
            
            res.write(data);
            res.end();
            //res.end(data); can be used than the both the lines above
        }
    })
    // res.write('<h1>hello buddie</h1>');
    
});

server.listen(3000, 'localhost', () => {
    console.log('listening for request on port 3000');
});