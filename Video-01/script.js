const { log } = require('console');
const fs = require('fs');

// fs.writeFile('hey.txt', 'hey hello how are you?', function(err){
//     if(err) console.error(err)
//     else console.log("done")
// })

// fs.appendFile('hey.txt', 'I am good', function(err){
//     if(err) console.error(err)
//     else console.log("done")
// })

// fs.rename('hey.txt', 'hello.txt', function(err){
//     if(err) console.error(err)
//     else console.log("renamed");
// })

// fs.copyFile('hello.txt', './copy/copy.txt', function(err){
//     if(err) console.error(err)
//     else console.log('copied')
// })

// fs.unlink('hello.txt', function (err) {
//     if (err) console.error(err)
//     else console.log('removed')
// })

fs.rm('./copy', {recursive:true}, function(err){
    if(err) console.error(err)
    else console.log('removed')
})