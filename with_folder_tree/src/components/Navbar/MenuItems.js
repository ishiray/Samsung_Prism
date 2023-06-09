import { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Table from './table';

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [Profile, setProfile] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [parameter1, setParameter1] = useState("");
  const [parameter2, setParameter2] = useState("");

  const data = [
    { column1: 'T3410', column2: '15' },
    { column1: 'T3411', column2: '10' },
    { column1: 'T3415', column2: '5' },
    { column1: 'T3419', column2: '20' },
  ];

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
      window.innerWidth > 960 && setDropdown(true);
    }
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
    <>
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
      
    </li>
    <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
      <Modal.Header closeButton>
          <Modal.Title>{Profile}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <label htmlFor="profileName">Profile Name:</label>
                  <input
                    type="text"
                    id="profileName"
                    name="profileName"
                    className="form-control"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                />
            </div>
          </form>
          <br></br>
          <div className="tabs">
            <Tabs>
              <TabList className="tabs-row">
                <Tab className="tab-item">General Configuration</Tab>
                <Tab className="tab-item" disabled>NE</Tab>
                <Tab className="tab-item">Timer</Tab>
              </TabList>

              <TabPanel>
                <form>
                  <div className="form-group">
                    <label htmlFor="parameter1">MCC:</label>
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
                    <label htmlFor="parameter2">MNC:</label>
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
              </TabPanel>
              <TabPanel>
                <h2>in progress...</h2>
              </TabPanel>
              <TabPanel>
                <Table data={data} />
              </TabPanel>
            </Tabs>
          </div>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseProfileModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default MenuItems;
