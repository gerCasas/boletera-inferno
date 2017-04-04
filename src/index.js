import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import { Provider } from 'inferno-mobx'
import { observable } from 'mobx'
import App from './App';
import createBrowserHistory from 'history/createBrowserHistory';
import EventDetail from './components/EventDetail/EventDetail';
import Footer from './components/Footer/Footer';
import ErrorRequestPage from './components/ErrorRequestPage/ErrorRequestPage';
import EventList from './components/EventList/EventList';
// import TestCarousel from './components/TestCarousel/TestCarousel';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

let myStore = observable({ city_selected: '', city_selected_name: ' Selecciona Ciudad'  })
let myCitys = observable({ "data": [] })
let myEvents = observable({ "data": [] })
let myCarouselEvents = observable({ "data": []})
let myCategory = observable({ category_selected_id: '', category_selected_name: 'Todos' })

const browserHistory = createBrowserHistory();

const routes = (
  <Provider myStore={ myStore } myEvents={ myEvents } myCarouselEvents={ myCarouselEvents } myCategory={ myCategory } myCitys={ myCitys }>
    <Router history={ browserHistory }>
      <Route component={ App }>
        <IndexRoute component={ EventList }/>
        <Route path="/ciudad/:city_id/" component={ EventList }/>
        <Route path="/categoria/:category_id/" component={ EventList }/>
        <Route path="/eventos/:id/:title" component={ EventDetail }/>
        <Route path="*" component={ ErrorRequestPage }/>
      </Route>
    </Router>
  </Provider>
);

Inferno.render(
    routes, document.getElementById('app')
);

Inferno.render(
    <Footer />, document.getElementById('footer')
);
