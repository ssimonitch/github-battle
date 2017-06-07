const React = require('react');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;

const Home = require('./Home');
const Nav = require('./Nav');
const Popular = require('./Popular');
const Battle = require('./Battle');
const Results = require('./Results');

class App extends React.Component {
  render () {
    return (
      <Router>
        <div className="container">
          <Nav />
          {/* Switch renders route in order and defaults to last case if no routes avail */}
          <Switch>
            {/* exact requires that path must match what is specified to be active */}
            <Route exact path="/" component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            {/* default path will render for as long as path is active */}
            <Route path='/popular' component={Popular} />
            {/* render UI if path not found */}
            <Route render={() => {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;
