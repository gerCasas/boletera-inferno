import Inferno from 'inferno';
import Component from 'inferno-component';
import ApiService from './utils/ApiService';
import './App.css';
import EventList from './components/EventList/EventList';

class App extends Component {
  componentDidMount() {
    // GET list of events from API
    ApiService.getEventList()
      .then(
        res => {
          // Set state with fetched event list
          this.setState({
            events: res.data
          });
        },
        error => {
          // An error occurred, set state with error
          this.setState({
            error: error
          });
        }
      );
  }

  render(props, state) {
    return(
      <div className="App">
        <header className="App-header bg-primary clearfix">
          <h1 className="text-center">Boletera</h1>
        </header>
        <div className="App-content container-fluid">
          <div className="row">
            {
              state.events ? (
                // <ul>
                //   {
                //     state.events.map((my_event) => (
                //       <li key={my_event.id}>
                //       {my_event.name}
                //       </li>
                //     ))
                //   }
                // </ul>
                <EventList events={state.events} />
              ) : (
                <p>Loading...</p>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
