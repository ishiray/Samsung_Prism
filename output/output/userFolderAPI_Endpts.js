const { error } = require('console');
const express = require('express')
const app=express()


// code from here on must be added to index.js of server2
const fs= require('fs')
const path= require('path')


//stores the path of the base folder, this can be changed to any folder
const pathadd="C:\\Users\\SHAN_\\OneDrive";


//stores the name of the user directory. each user will be assigned a directory  the same as the username
let pathHead = ''; 


app.use(express.json());

// POST endpoint to update pathHead variable, this funcionality must be added to /login endpoint so that  each user will be shown their own directory
// this endpoint must also be kept so that if we need to change directories using folder tree we can hit this endpoint by clicking on the folder in the folder tree
app.post('/update-path-head', (req, res) => {
//set newPathHead =req.body.username in /login
  const newPathHead=req.body.pathHead;
  if (!newPathHead) {
    return res.status(400).json({ error: 'Invalid pathHead value' });
  }
  
  // Update the pathHead variable
  pathHead=newPathHead;
  return res.status(200).json({ message: 'pathHead updated successfully' });
});

// this endpoint functionality must be added to the /register endpoint so that every time a new user account is created a folder is created along with it 
// this endpoint must also be kept so that we can create folders through folder tree by clicking a button
app.post('/create-new-user-directory',(req,res)=>{
    //dirName shouldbe replaced with username
    const newDirName = req.body.dirName;
    
    pathHead = newDirName;
    console.log('New directory to be created is',newDirName);
    try{
        fs.mkdirSync(path.join(pathadd,newDirName));
        console.log('directory created successfully')
        return res.status(200).json({success:" folder creation was successful"})
    }catch(err){
        console.error(err);
        return res.status(500).json({error:" error in creating folder"})
    }
    
})




// readdir(pathadd,(err,files)=>{
//     if(err){
//         console.error(err);
//     }else{
//         console.log(files);
//         // dir=files;
//         files.forEach((file)=>{
//             const filePath= path.join(pathadd,file);
//             // console.log(filePath)
//             stat(filePath,(err,stats)=>{
//                 if(err){
//                     console.error(err);
//                 }else{
//                     if(stats.isDirectory()){
//                         // console.log(stats.isDirectory(),stats.isFile())
//                         dir.push(file);
//                     }
//                 }
//             })
//         })
//         // console.log(dir)
//         const txtFiles = files.filter((file) => file.endsWith('.txt'));
        
//         txtFiles.forEach(file=>{
//             txtfilesFin.push(file);
//         })
        
//         txtfilesFin=txtfilesFin.map((file)=>{
//             return path.basename(path.join(pathadd,file),'.txt');
//         })
//         console.log(txtfilesFin)

//     }

// })


// used to get a list of directories and test files , we need to send a get request from frontend and then use the data sent in the response to render the folder tree
app.get('/get-directory-contents',(req,res)=>{
    console.log(req.method);
    const finalPath=path.join(pathadd,pathHead);
    console.log('directory path',finalPath)
    fs.readdir(finalPath,(err,files)=>{
    if(err){
        console.error(err);
    }else{
        const folders = [];
      const textFiles = [];

      files.forEach((file) => {
        const filePath = path.join(finalPath, file);
        const fileStats = fs.statSync(filePath);

        if (fileStats.isDirectory()) {
          folders.push(file);
        } else if (fileStats.isFile() && path.extname(file).toLowerCase() === '.txt') {
          textFiles.push(file);
        }
      });

      return res.status(200).json({ folders, textFiles });

    }

})

})

app.post('/enter-directory',(req,res)=>{
  const newPathHead=req.body.path;
  pathadd=path.join(pathadd,pathHead);
  console.log('new base path', pathadd);
  pathHead=newPathHead;
  console.log(' new path head',pathHead)
  res.status(200).json({success:" path updated"})
})

app.put("/parent-directory", function (req, res) {
  const tempPath=path.dirname(pathadd);
  pathHead='';
  for (let index = tempPath.length; index < pathadd.length; index++) {
    pathHead += pathadd[index];
  }
  console.log(pathHead)
  pathadd=tempPath;
  console.log(pathadd)
    
  res.json({ finalPath: path.join(pathadd,pathHead) });
});




// port can be changed accordingly
app.listen(5000,()=>{
    console.log('server running on port 5000...')
});
