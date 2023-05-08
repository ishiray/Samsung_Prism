import React, { useState } from "react"
import FolderTree from './FolderTree';
import "../../styles.css";
import Button from 'react-bootstrap/Button';

function FileTree(){
    const [data, setData] = useState({});

    async function getFilesInDirectory(dirHandle,currStruct=null) {
      function createNode(filesystemfilehandle,isFolder,fileHandle=null){
        return {
          name:filesystemfilehandle.name,
          handle:filesystemfilehandle,
          //type:isFolder? "folder": String(fileHandle.type).split("/")[0],
          type:isFolder? "folder": String(fileHandle.type),
          folder:isFolder,
          toggled: true,
          children: []
        }
      }


      try {
        if (currStruct===null){
          currStruct= createNode(dirHandle,true);
        }

        let entries= await dirHandle.values();

        for await (const entry of entries) {
          //console.log(entry);

          if (entry.kind==='file') {
            // Entry is a file
            const fileHandle = await entry.getFile();
            // Perform file operations with fileHandle
            let fileNode=createNode(entry, false,fileHandle);

            if(fileNode.type==="text/plain"){
              const writableStream = await entry.createWritable();
              const array = ["it worked"];
              const theBlob= new Blob(array, { type: "text/plain" });
              // write our file
              await writableStream.write(theBlob);
              // close the file and write the contents to disk.
              await writableStream.close();
              console.log("done editing");
            }

            currStruct.children.push(fileNode);
          } 
          
          
          else if (entry.kind==='directory') {
            // Entry is a folder
            const subdirectoryHandle = await dirHandle.getDirectoryHandle(entry.name);
            console.log("Folder Handle:", subdirectoryHandle);
            let folderNode=createNode(subdirectoryHandle, true);
            console.log("Folder node:", folderNode);
            folderNode=await getFilesInDirectory(subdirectoryHandle,folderNode);
            console.log("new Folder node:", folderNode);
            currStruct.children.push(folderNode);
          }
        }
        console.log("done with loop and this is the output");
        console.log(JSON.stringify(currStruct));
        return currStruct;
      } catch (err) {
        console.error(err);
      }
    }


    async function requestFileSystemAccess() {
      try {
        //await navigator.storage.requestTemporary();
        const dirHandle = await window.showDirectoryPicker();
        // Use the selected directory handle to access files within it
        // ...
        console.log(dirHandle);

        const opts = {};
        opts.mode = "readwrite";
        const perms = await dirHandle.requestPermission(opts);
        console.log(perms);

        //console.log(dirHandle.keys());

        let theData=await getFilesInDirectory(dirHandle);
        console.log("FINALLY");
        console.log(theData);
        setData(theData);

      } catch (err) {
        console.error(err);
      }
      
    }


    return (
        <>
        <div className="filetree">
        <div >
          <label htmlFor="fileInput">Choose a Folder:</label>
          <Button variant="outline-dark" onClick={requestFileSystemAccess} style={{ height: '4%', margin: 0, marginLeft: "2%", fontSize: '14px', padding:0}}>
            Select
          </Button>
          {/*<button id="folder-select" onClick={requestFileSystemAccess} style={{ backgroundColor: '#919191' }}>click me</button>
        */}
        </div>
        <div>
          <FolderTree json={data} />
        </div>
        </div>
        </>
      );
    }
    
export default FileTree;