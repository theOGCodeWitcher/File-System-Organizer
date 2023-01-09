#!/usr/bin/env node
let inputArr =process.argv.slice(2); 
//to read whatever is written on command line
// console.log(inputArr);

let helpObj = require('./commands/help');
let organizeObj = require('./commands/organize');
let treeObj = require('./commands/tree')

let command = inputArr[0];
let dirPath = inputArr[1];
    switch (command) {
        case "tree":
            treeObj.treeFunc(dirPath);
            break;
        case "organize":
            organizeObj.organizeFunc(dirPath);
            break;
        case "help":
            helpObj.helpFunc();
            break;
        default:
            console.log("Please🧐 enter the correct usable command");
            break;
    }

   


  

