import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/search' component={Search} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
}

const Home = () => {
  return <div>home</div>;
};

const Search = () => {
  return <div>search</div>;
};

const Signup = () => {
  return <div>signup</div>;
};

export default App;
