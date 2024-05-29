const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');
const { toUnicode } = require('punycode');
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


const tempOverveiw = fs.readFileSync(`${__dirname}/templates/template-overview.html` , 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html` , 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html` , 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json` , 'utf-8');
const DataObj = JSON.parse(data);

console.log(slugify('Fresh Avocados' , {replacement : '-'}));

const slugs = DataObj.map(el => slugify(el.productName , {remove : /-/g}));

console.log(slugs);

const server = http.createServer((req , res) => {
    
    const {query  , pathname} = url.parse(req.url , true);

    // console.log("query : " , query);
    // console.log("pathname : " , pathname);

    // Overveiw Page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200 , {'Content-type' : 'text/html'});

        const cardsHtml = DataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverveiw.replace('{%PRODUCT_CARDS%}' , cardsHtml);
        res.end(output);
    }

    // Product Page
    else if (pathname === '/product') {
        const product = DataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);
        console.log(query);
    }

    // API Page
    else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type' : 'application/json'});
        res.end(data);

    // Not Found
    } else {
        res.writeHead(404 , {
            'Content-type' : 'text/html' ,
            'my-own-header' : 'Hello World'
        });
        res.end('<h1>page Not Found !</h1>');
    }
});

server.listen(8000 , '127.0.0.1' , () => {
    console.log('Listening to Requests on Port 8000');
});