import { Button, Content } from 'carbon-components-react';
import { Link, Outlet } from 'react-router-dom';

import TutorialHeader from './components/TutorialHeader';

import './App.scss';

const App = () => {
  return (
    <>
      <TutorialHeader />
      <Content>
        <Outlet />
      </Content>
    </>
  );
}

export default App;
