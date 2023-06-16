# Samsung_Prism_v3
Created with CodeSandbox
this contains simulator code that have functional grid element as well as a functional bottom navbar

** /sutList
use this to get the list of possible systems under test. you must get this dropdown when you click on any SUT dropped icon.
refer line 32 onwards in Navbar.js for an example usage which looks like this-
    fetch('http://localhost:3001/simList')
      .then(response => {
        return response.json();
      })
      .then(data => {})
your outputs will look like [
  { sut_name: 'Tar_SGW' },
  { sut_name: 'MME+S-GW' },]


** /selectiveSimList
use this to get only possible sims according to the sut which is already present. Must be displayed
in dropdown on sims which are connected to a sut via a message. You must send the current sut (labelled 'sut') in the body
of the request. Example GET query:
SUT='MME'
http://localhost:3001/selectiveSimList?sut=${SUT}
your outputs will look like [
  { sim_name: 'UE/EnodeB' },
  { sim_name: 'S-GW' },]


** /getPtclIntfID
use this to get protocol and interface id if you know sim and sut.
Example GET query:
SUT='MME'
SIM='UE/EnodeB'
http://localhost:3001/getPtclIntfID?sut=${SUT}&sim=${SIM}
your outputs will look like [ { intf_id: 1, ptcl_id: 1 } ]


** /getMsgNameList
use this to get the dropdown of possible messages. (use this in the message popup. it is the first field). It needs
ptcl_id.
ptclId='1'
http://localhost:3001/getMsgNameList?ptcl_id=${ptclId}
your outputs will look like
[
  {
    msg_xsd_id: 1073,
    msg_name: 'KILL_REQUEST                            '
  },
  {
    msg_xsd_id: 1008,
    msg_name: 'UE_CONTEXT_RELEASE_REQUEST              '
  },]


** /getMsgXsd
use this to get the message xsd file. it needs msg_xsd_id.
msgxsdid='1073'
http://localhost:3001/getMsgXsd?msg_xsd_id=${msgxsdid}
output:
{
    msg_xsd: '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" attributeFormDefault="unqualified">\n' +....}



** /getProfileInputs
Use this to populate the profile modal. it needs intf_id, ptcl_id and control_label
intfID='1'
ptclID='1'
controlLabel='General Configuration'
http://localhost:3001/getProfileInputs?intf_id=${intfID}&ptcl_id=${ptclID}&control_label=${controlLabel}
the output is going to be  [ { config_param_name: 'MNC', default_value: null } ]


