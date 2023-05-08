import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

export const Nav = styled.nav `
    background: #cdd2d4;
    height: 30px;
    display: flex;
    justify-content: start; 
    padding: 0.2rem 1rem;
    z-index: 10;

    
`

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: start;
    margin: 0;
    justify-content: start;
    text-decoration: none;
    padding: 0 0.5rem;
    height: 80%;
    cursor: pointer;

    &.active {
        color: #000;
    }
`


export const Bars = styled(FaBars)`
    display:none;
    color: #fff;

    @media screen and (max-width: 780px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    white-space: nowrap;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

