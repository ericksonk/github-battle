var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');
var Switch = require('react-router-dom').Switch;

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/battle" component={Battle}></Route>
            <Route exact path="/battle/results" component={Results}></Route>
            <Route path="/popular" component={Popular}></Route>
            <Route render={() => {
              return <p>Not Found</p>
            }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

module.exports = App;
