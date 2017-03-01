import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './App';
import Homepage from './components/Homepage/Homepage';
import EventDetail from './components/EventDetail/EventDetail';
import EventList from './components/EventList/EventList';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const browserHistory = createBrowserHistory();

const routes = (
  <Router history={ browserHistory }>

    <Route component={ App }>
      <IndexRoute component={ Homepage }/>
      <Route path="/events" component={ EventList }/>
      <Route path="/events/:id" component={ EventDetail }/>
    </Route>
  </Router>
);

Inferno.render(
  routes, document.getElementById('app')
);
