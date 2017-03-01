import Inferno from 'inferno';
import Component from 'inferno-component';
import './EventDetail.css';
import ApiService from '../.././utils/ApiService';

class EventDetail extends Component {

  componentDidMount() {
    // GET list of events from API
    ApiService.getEvent(this.props.params.id)
      .then(
        res => {
          console.log(res);
          // Set state with fetched event list
          this.setState({
            event_info: res
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
    console.log(state.event_info);
    return(
      <div>
        <h2>asd</h2>
      </div>
    );
  }
}

export default EventDetail;
