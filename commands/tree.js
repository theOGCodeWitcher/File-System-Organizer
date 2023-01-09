let fs = require('fs');
const path = require('path');
let pathModule = require('path');

    function treeFn(path) {
        console.log("Tree command implemented for: " + path);
        if(path == undefined){
            treeHelper(process.cwd(), "");
            return;
        }else{
            let pathExists  = fs.existsSync(path);
            if(pathExists){
                //console.log("kjndchbdhjbvsjhbcv----------cjdsbcjhsdc");
                    treeHelper(path, "");
                    
            }else{
                console.log("Please enter the correct path");
                return;
            }
        }
    }

    function treeHelper(path , indent){
        let isFile = fs.lstatSync(path).isFile();
        if(isFile){
            let nameToPrint = pathModule.basename(path);
            console.log(indent + "|---" + nameToPrint); 
        }else{
            let nameToPrint = pathModule.basename(path);
            console.log(indent + " L__" + nameToPrint);
            let childFileArray = fs.readdirSync(path);
            for(let i in childFileArray){
                let childFolderPath = pathModule.join(path , childFileArray[i])
                treeHelper(childFolderPath , indent + "\t");
            }
        }
    }

    module.exports ={
        treeFunc : treeFn
    }