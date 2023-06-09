import { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [Profile, setProfile] = useState(false);
  const [parameter1, setParameter1] = useState("");
  const [parameter2, setParameter2] = useState("");

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    if(!showProfileModal){
    window.innerWidth > 960 && setDropdown(true);}
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  const handleLeafClick = () => {
    // Call your function here
    // Example: perform some action or show a modal
    console.log('Button clicked');
    setProfile(items.title);
    setShowProfileModal(true);
  };
  const handleCloseProfileModal = () => {
    console.log("The params are "+parameter1+parameter2)
    setShowProfileModal(false);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {window.innerWidth < 960 && depthLevel === 0 ? (
              items.title
            ) : (
              <Link to={items.url}>{items.title}</Link>
            )}

            {depthLevel > 0 &&
            window.innerWidth < 960 ? null : depthLevel > 0 &&
              window.innerWidth > 960 ? (
              <span>&raquo;</span>
            ) : (
              <span className="arrow" />
            )}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{' '}
            {depthLevel > 0 ? (
              <span>&raquo;</span>
            ) : (
              <span className="arrow" />
            )}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : items.onclick === "profileMenuDisplay" ? (
        <button type="button" onClick={handleLeafClick}>
          {items.title}
        </button>
      ):
      (<Link to={items.url}>{items.title}</Link>)
      }
    <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
      <Modal.Header closeButton>
          <Modal.Title>{Profile}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="parameter1">Parameter 1:</label>
              <input
                type="text"
                id="parameter1"
                name="parameter1"
                className="form-control"
                value={parameter1}
                onChange={(e) => setParameter1(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="parameter2">Parameter 2:</label>
              <input
                type="text"
                id="parameter2"
                name="parameter2"
                className="form-control"
                value={parameter2}
                onChange={(e) => setParameter2(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseProfileModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

    </li>
  );
};

export default MenuItems;
