
let fs = require('fs');
const path = require('path');
let pathModule = require('path');

let types ={
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
     app: ['exe', 'dmg', 'pkg', "deb"]
}
//let typeObj = require('/Users/thewithcer/VscodeProjects/webDev/fileSystemOrganiser/main.js')
    function organiseFn(path) {
        console.log("Tree command implemented for: " + path);
        if(path == undefined){
           // console.log("Please enter the correct path");
            path = process.cwd();
            let createdFolderPath = pathModule.join(path , "organised_Folder");
            if(!fs.existsSync(createdFolderPath)){ // only create folder when the folder is not already present
                fs.mkdirSync(createdFolderPath);
                organizeHelper(path , createdFolderPath );
            }
            return;
        }else{
            let pathExists  = fs.existsSync(path);
            if(pathExists){
                    //if path exist we want to create a folder/directory at that path
                    let createdFolderPath = pathModule.join(path , "organised_Folder");
                    if(!fs.existsSync(createdFolderPath)){ // only create folder when the folder is not already present
                        fs.mkdirSync(createdFolderPath);
                        organizeHelper(path , createdFolderPath );
                    }
                    
            }else{
                console.log("Please enter the correct path");
                return;
            }
        }
    }
   

    function organizeHelper(source , destination) {
        // console.log("helper functon runs" + source +" " + destination) ;
        let allFiles = fs.readdirSync(source);
        // console.log(allFiles); // array with all filenames recieved
        for(i in allFiles){
           let joinedPath =  pathModule.join(source , allFiles[i]);
           let isFile = fs.lstatSync(joinedPath).isFile();  //checks if a file or a despository
           if(isFile){
            // console.log(joinedPath);
                let extension = path.extname(joinedPath);
                extension = extension.substring(1);
                // console.log(extension);
                // search in the type object now
                let checkedType = checkIfPresent(extension);
                // console.log(joinedPath + "belongs to ---->" + checkedType);
                copyFile(joinedPath , destination ,checkedType);
           }
           
        }
    }

    function copyFile(joinedPath , destination ,checkedType) {
        let destinationFolderName = pathModule.join(destination , checkedType);
        if(!fs.existsSync(destinationFolderName)){
            fs.mkdirSync(destinationFolderName);
        }
        let fileName = path.basename(joinedPath);
        let destinationFile = path.join(destinationFolderName,fileName)
        fs.copyFileSync(joinedPath, destinationFile);
        // fs.unlinkSync(joinedPath); used to delete a file after it has been copied
        console.log();
    }

    function checkIfPresent(checkVar) {
        for(let i in types){
            let type = types[i];
            for(let j in type){
                    if(checkVar == type[j] ){
                        return i;
                    }
            }
        }
        return "others";
    }

    module.exports ={
        organizeFunc : organiseFn
    }