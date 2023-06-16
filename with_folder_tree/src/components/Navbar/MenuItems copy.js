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
  const [Sim, setSim] = useState(false);
  const [Sut,setSut] = useState('MME');
  const [ptclID,setPtclID]=useState();
  const [intfID,setIntfID]=useState();

  const [profileName, setProfileName] = useState("");
  const [parameter1, setParameter1] = useState("");
  const [parameter2, setParameter2] = useState("");
  const [formData, setFormData] = useState({});
  
  const inputFields = {
    'General Configuration': [
      { config_param_name: 'MNC', default_value: null },
      { config_param_name: 'MCC', default_value: null },
      { config_param_name: 'MPC', default_value: null }
    ],
    'NE': [],
    'Timer': [
      { config_param_name: 'T3410', default_value: '15' },
      { config_param_name: 'T3416', default_value: '30' },
      { config_param_name: 'T3411', default_value: '10' },
      { config_param_name: 'T3440', default_value: '10' }
    ]
  };

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
    setSim(items.title);
    getModalParams();
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    console.log("The params are "+parameter1+parameter2)
    setShowProfileModal(false);
  };

  async function getIDs() {
    try {
      const response = await fetch('http://localhost:3001/simList');
      const data = await response.json();
      console.log('The data is ', data);
      setPtclID(data.ptcl_id);
      setIntfID(data.intf_id);
    } catch (error) {
      console.error(error);
    }
  }
  
  async function getInputs(label) {
    try {
      let controlLabel = label;
      await getIDs(); // Wait for getIDs to complete and set ptclID and intfID
      const response = await fetch(`http://localhost:3001/getProfileInputs?intf_id=${intfID}&ptcl_id=${ptclID}&control_label=${controlLabel}`);
      const data = await response.json();
      console.log('The data is ', data);
      inputFields[label] = data;
    } catch (error) {
      console.error(error);
    }
  }
  
  const getModalParams = async () => {
    console.log("Inside getModalParams");
    try {
      // Use that to get the input fields
      // For general configuration
      await getInputs('General Configuration');
      await getInputs('NE');
      await getInputs('Timer');
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e, configParamName) => {
    setFormData((prevData) => ({
      ...prevData,
      [configParamName]: e.target.value
    }));
  };

  const renderTextFields = (tab) => {
    const fields = inputFields[tab]; 

    return fields.map((field) => (
      <div className="form-group" key={field.config_param_name}>
        <label htmlFor={field.config_param_name}>{field.config_param_name}:</label>
        <input
          type="text"
          id={field.config_param_name}
          name={field.config_param_name}
          className="form-control"
          value={formData[field.config_param_name] || ''}
          onChange={(e) => handleInputChange(e, field.config_param_name)}
        />
      </div>
    ));
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
          <Modal.Title>{Sim}</Modal.Title>
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
                <Tab className="tab-item">NE</Tab>
                <Tab className="tab-item">Timer</Tab>
              </TabList>

              <TabPanel>
                <form>
                  {renderTextFields('General Configuration')}
                </form>
              </TabPanel>
              <TabPanel>
                <form>
                  {renderTextFields('NE')}
                </form>
              </TabPanel>
              <TabPanel>
                <Table data={inputFields['Timer']} />
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
