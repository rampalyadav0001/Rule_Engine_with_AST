import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateRule from './components/CreateRule';
import CombineRules from './components/CombineRules';
import EvaluateRule from './components/EvaluateRule';
import DisplayRule from './components/DisplayRule';
import Layout from './layout/layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<CreateRule />} />
          <Route path='/combine-rules' element={<CombineRules />} />
          <Route path='/evaluate-rule' element={<EvaluateRule />} />
          <Route path='/display-rule' element={<DisplayRule />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
