import React, { useState } from "react"
import FolderTree from './FolderTree';
import "../../styles.css";

function FileTree(){
    const [data, setData] = useState({});

    function getStructuredList(listFiles){


        //////////////////////////////////////////////////////////////
        function createNode(fileName,path,folder){
          return {
            name:fileName,
            path:path,
            folder:folder,
            toggled: true,
            children: []
          }
        }
    
        function recurStructCreate(currStruct,elemList,currpath){
          console.log("in recurStructCreate with inputs current struct "+JSON.stringify(currStruct)+" elements list "+elemList+" current path "+currpath);
          if (elemList.length === 0) return currStruct;
          let elem=elemList.shift();
          currpath=[currpath,elem].join("/");
          for (let i = 0; i < currStruct.length; i++){
            if (currStruct[i]["name"]===elem){
              console.log("Found the element ",elem);
              currStruct[i]["children"]=recurStructCreate(currStruct[i]["children"],elemList,currpath);
              console.log("Now returning 1 ",JSON.stringify(currStruct));
              return currStruct;
            }
          }
    
          //if not found
          console.log("Did not find the element ",elem);
          let newNode=createNode(elem,currpath,!elem.includes("."));
          console.log("New node is ",JSON.stringify(newNode));
          currStruct.push(newNode);
          console.log("New currStruct is ",JSON.stringify(currStruct));
          currStruct[(currStruct.length)-1]["children"]=recurStructCreate(currStruct[(currStruct.length)-1]["children"],elemList,currpath);
          console.log("Now returning 2 ",JSON.stringify(currStruct));
          return currStruct;
        }
        ///////////////////////////////////////////////////////////////////////////////
    
        let structure=[];
        for (const file of listFiles){
          const splitPathList=file.webkitRelativePath.split("/");
          let currPath="";
    
          structure=recurStructCreate(structure,splitPathList,currPath);
          console.log("This is the structure "+JSON.stringify(structure)+" after a file "+file.webkitRelativePath);
        }
        console.log("This is the structured list "+JSON.stringify(structure));
        return structure[0];
    }
    
    
    const handleFileInputChange = (e) => {
    console.log(e);

    const selectedFiles = Array.from(e.target.files);
    console.log(selectedFiles);
    console.log("Getting structured list");
    const structuredList=getStructuredList(selectedFiles);
    console.log("This is the final structured list "+JSON.stringify(structuredList));

    //setFilesList(selectedFiles);
    setData(structuredList);

    };

    return (
        <>
        <div className="filetree">
        <div >
          <label htmlFor="fileInput">Choose a Folder:</label>
          <input type="file" id="fileInput" webkitdirectory="" directory="" onChange={handleFileInputChange}/>
        </div>
        <div>
          <FolderTree json={data} />
        </div>
        </div>
        </>
      );
    }
    
export default FileTree;