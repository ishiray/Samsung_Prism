import React, { useState } from 'react'
import Container from "@mui/material/Container";
import { DargDropContext, Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';



const Workspace = () => {
    return (
        <DragDropContext>
            <Droppable droppableId='characters'>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={{marginLeft: "10rem"}}>
                        <div style = {{ backgroundColor: "black", height: "38rem", width: "52rem"}}> </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
           
    );
}



export default Workspace;


  
 
