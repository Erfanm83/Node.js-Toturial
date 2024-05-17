const fs = require('fs');
const http = require('http');
const url = require('url');

//////////////////////////////////////////////
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOUT = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt' , textOUT);
// console.log('File written !');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt' , 'utf-8' ,(err, data1) => {
//     if(err) return console.log('ERROR !');

//     fs.readFile(`./txt/${data1}.txt` , 'utf-8' ,(err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt' , `utf-8` ,(err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt' , `${data2}\n${data3}` , 'utf-8' , err => {
//                 console.log('your file has been written !')
//             })
//         });
//     });
// });
// console.log('Will read File!');


//////////////////////////////////////////////
// Server
const server = http.createServer((req , res) => {
    console.log(req.url);
    res.end('Hello From The Server !');
});

server.listen(8000 , '127.0.0.1' , () => {
    console.log('Listening to Requests on Port 8000');
});