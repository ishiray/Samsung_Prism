import { Routes, Route } from 'react-router-dom';
import Home from '../routes/Home';
import Workspace from '../Workspace/workspace';
import Layout from './Layout';
import Grid from '../Grid/Grid';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="workspace" element={<Workspace />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
