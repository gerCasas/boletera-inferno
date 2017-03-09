import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './App';
import Homepage from './components/Homepage/Homepage';
import EventDetail from './components/EventDetail/EventDetail';
import EventList from './components/EventList/EventList';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'inferno-mobx'
import { observable } from 'mobx'

let myStore = observable({ city_selected: '0' })
let myEvents = observable({ "data": [] })
let myCarouselEvents = observable({ "data": [] })

const browserHistory = createBrowserHistory();

const routes = (
  <Provider myStore={ myStore } myEvents={ myEvents } myCarouselEvents={ myCarouselEvents }>
    <Router history={ browserHistory }>
      <Route component={ App }>
        <IndexRoute component={ Homepage }/>
        <Route path="/events" component={ EventList }/>
        <Route path="/events/:id" component={ EventDetail }/>
      </Route>
    </Router>
  </Provider>
);

Inferno.render(
    routes, document.getElementById('app')
);
