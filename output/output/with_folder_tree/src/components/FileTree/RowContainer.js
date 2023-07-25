import PropTypes from 'prop-types';
import { useState } from 'react';
import Styled from 'styled-components';
import { FcFolder, FcFile } from "react-icons/fc";
import { FaFolder, FaFile, FaFolderOpen } from "react-icons/fa";

const Row = Styled.div`
    display:flex;
    align-items: center;
    cursor:${({ type }) => type === 'folder' ? 'pointer' : null};
    padding: 0rem;
    margin: 0rem;height: 2rem;
    
`

const Name = Styled.h5`
    margin-left: 0.5rem;
    font-size: 15px;
`;

const RowContainer = ({ type, name, handleClick, folderIcon }) => {
    return (
        <Row type={type} onClick={handleClick ? handleClick : null}>
            {type === 'folder' ? folderIcon : <FaFile />}
            <Name>{name}</Name>
        </Row>
    )
}

Row.propTypes = {
    type: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
};
export default RowContainer;
