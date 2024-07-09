const fs = require('fs');

// reading files
fs.readFile('./docs/blog.txt', (err, data)=>{ //asynchronous function readFile
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
});
 
console.log('last line');
// writing files
fs.writeFile('./docs/blog1.txt', 'hello everyone', ()=>{
    console.log('file has been written');
});


// directories
if( !fs.existsSync('./assets')){
    fs.mkdir('./assets', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('folder created');
    })
} else {
    fs.rmdir('./assets', (err)=>{
        if(err) {
            console.log(err)
        }
        console.log('folder removed');
    })
}

// deleting files
if(fs.existsSync('./docs/blog1.txt')) {
    fs.unlink('./docs/blog1.txt', (err)=>{
        if(err) console.log(err);
        console.log('deleted file');
    })
}