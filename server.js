const  http=require('http');
const  fs=require('fs');

const  server=http.createServer((req, res) => {
    console.log('A call to server has been made!');
    // console.log(req);
let path='./views';
// res.setHeader('Content-Type', 'text/html');
switch(req.url){
    case '/':
        path+='/index.html';
        res.statusCode=200;
        break;
    case '/about':
            path+='/about.html';
            res.statusCode=200;
        break;
    case '/about-me':
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();
        break;
    default:
            path+='/404.html';
            res.statusCode=404;     

}
   fs.readFile(path,(err,fileData)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        res.end(fileData);
    }
   });
});
server.listen(3000,'localhost',()=>{
    console.log('Server is listening on port 3000');
});