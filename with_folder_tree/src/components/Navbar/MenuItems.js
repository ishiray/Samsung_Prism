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
  const [formFields, setFormFields] = useState({1: [ { config_param_name: 'MNC', default_value: null } ],
  2: [ { config_param_name: 'eNB Local Recv Port No', default_value: null }, { config_param_name: 'MME IP Address', default_value: null }],
  3: [   { config_param_name: 'T3410', default_value: '15' },
                { config_param_name: 'T3411', default_value: '10' },
                { config_param_name: 'T3415', default_value: '5' },
                { config_param_name: 'T3419', default_value: '20' },
            ]
    });

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
    getModalDetails(items.title);
  };

  async function getModalDetails(SIM) {
    const SUT = 'MME';
    let intID = 0;
    let ptclID = 0;
    let formFieldData = {};
    
    try {
      const idsResponse = await fetch(`http://localhost:3001/getPtclIntfID?sut=${SUT}&sim=${SIM}`);
      var ids = await idsResponse.json();
      console.log("The raw ids are ", ids);
      intID=ids[0]['intf_id']
      ptclID=ids[0]['ptcl_id']
  
      for (let i = 1; i <= 3; i++) {
        const response = await fetch(`http://localhost:3001/getProfileInputs?intf_id=${intID}&ptcl_id=${ptclID}&config_param_type=${i}`);
        const output = await response.json();
        console.log(`The raw ${i} is `, output);
        formFieldData[i] = output; 

      }
      console.log("The formFieldData is ", formFieldData);
  
      setFormFields(formFieldData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const handleCloseProfileModal = () => {
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
                <Tab className="tab-item">NE</Tab>
                <Tab className="tab-item">Timer</Tab>
              </TabList>

              <TabPanel>
              <form>
                {
                formFields[1].map((field, index) => {
                  const handleInputChange1 = (ind, val) => {
                    let updatedFormFields = formFields;
                    updatedFormFields[1][ind]['default_value'] = val;
                    setFormFields(updatedFormFields)
                  };
                  return (
                    <div className="form-group" key={index}>
                      <label htmlFor={`parameter-${field['config_param_name']}`}>
                        {field['config_param_name']}
                      </label>
                      <input
                        type="text"
                        id={`parameter-${field['config_param_name']}`}
                        name={`parameter-${field['config_param_name']}`}
                        className="form-control"
                        value={formFields[1][index]['default_value']}
                        onChange={(e) => handleInputChange1(index, e.target.value)}
                      />
                    </div>
                  );
                }
                )
                }
              </form>
              </TabPanel>
              <TabPanel>
              <form>
                {
                formFields[2].map((field, index) => {
                  const handleInputChange2 = (ind, val) => {
                    let updatedFormFields = formFields;
                    updatedFormFields[2][ind]['default_value'] = val;
                    setFormFields(updatedFormFields)
                  };
                  return (
                    <div className="form-group" key={index}>
                      <label htmlFor={`parameter-${field['config_param_name']}`}>
                        {field['config_param_name']}
                      </label>
                      <input
                        type="text"
                        id={`parameter-${field['config_param_name']}`}
                        name={`parameter-${field['config_param_name']}`}
                        className="form-control"
                        value={formFields[2][index]['default_value']}
                        onChange={(e) => handleInputChange2(index, e.target.value)}
                      />
                    </div>
                  );
                }
                )
                }
              </form>
              </TabPanel>
              <TabPanel>
                <Table data={formFields[3]} />
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