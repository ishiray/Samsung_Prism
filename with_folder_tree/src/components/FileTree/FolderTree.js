import { useState } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import RowContainer from './RowContainer';
import { FaFolder, FaFile, FaFolderOpen } from "react-icons/fa";

const Container = Styled.div`
    padding:0rem 1.5rem;
`

const FolderTree = ({ json }) => {
    const [expand, setExpand] = useState(false);
    const [folderIcon, setFolderIcon] = useState(<FaFolder />);
    const handleClick = () => {
        setExpand(!expand);
        expand? setFolderIcon(<FaFolder />):setFolderIcon(<FaFolderOpen />)
    }

    if (json.folder) {
        return (
            <Container>
                <RowContainer type={'folder'} name={json.name} handleClick={handleClick} folderIcon={folderIcon}/>

                <div style={{ display: expand ? 'block' : 'none' }}>
                    {json.children.map(item => {
                        return <FolderTree key={item.name} json={item} />
                    })}
                </div>
            </Container>
        );
    } else {
        return (
            <Container>
                <RowContainer type={'file'} name={json.name} />
            </Container>
        )
    }

}

export default FolderTree;
