import { useState } from 'react';
import Styled from 'styled-components';
import RowContainer from './RowContainer';

const Container = Styled.div`
    margin-left: 80%; /* Update to push the component to the right */
    margin-right: 0%; /* Update to push the component to the right */
    font-size: 20px;
    display: inline-block;
`

const FolderTree = ({ json }) => {
    const [expand, setExpand] = useState(false);
    const handleClick = () => {
        setExpand(!expand);
    }

    if (json.folder) {
        return (
            <Container>
                <RowContainer type={'folder'} name={json.name} handleClick={handleClick}  />

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
