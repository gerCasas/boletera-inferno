import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-mobx';
import { Link } from 'inferno-router';
import './EventsCarousel.css';

function changeImage(obj) {
  const direction = obj.direction;
  const instance = obj.instance;
  const leghtArray = obj.length;
  var index = instance.state.indexImage;
  switch (direction){
    case 1:
      index += 1;
      if (index > (leghtArray-1)) {
        index = 0;
        // index = (leghtArray-1);
      }
      instance.setState({
        indexImage: index
      });
    break;
    case -1:
      index -= 1;
      if (index < 0) {
        index = (leghtArray-1);
        // index = 0;
      }
      instance.setState({
        indexImage: index
      });
    break;
    default:
  }
}

const EventsCarousel = connect (['myCarouselEvents'],
class EventsCarousel extends Component {

  lengthArray = 0;
  indexImageCarousel = 0;

  constructor() {
    super();

    this.state = {
      indexImage: 0
    };
  }

  componentDidMount() {
    // update time every x seconds
    this.timer = setInterval(() => {
      var index = (this.state.indexImage + 1);
      const leghtArray = this.lengthArray;
      if (index > (leghtArray-1)) {
        index = 0;
      }
        this.setState({ indexImage: index });
    }, 6000);
  }

  componentWillUnmount() {
    // stop when not renderable
    clearInterval(this.timer);
  }

  render(props, state) {

    let myCarouselEventsData = [];
    if (this.lengthArray !== props.myCarouselEvents.data.length || state.indexImage >= props.myCarouselEvents.data.length) {
      this.indexImageCarousel = 0;
    } else {
      this.indexImageCarousel = state.indexImage;
    }

    this.lengthArray = props.myCarouselEvents.data.length;
    myCarouselEventsData = props.myCarouselEvents.data;

    let styleColor = null;
    if (this.lengthArray > 0) {
      styleColor = myCarouselEventsData[this.indexImageCarousel].color_rgb;
    } else {
      styleColor = "white";
    }

    return(

      <div className="myCarousel" style={{backgroundColor:styleColor}}>
        { this.lengthArray ? (
          <Link to={"/events/"+myCarouselEventsData[this.indexImageCarousel].event_id} className="Event-clickeable" style={{ cursor: "pointer" }}>
            <img className="mySlides" id="mySlides" src={myCarouselEventsData[this.indexImageCarousel].image_path} alt="Events"  />
          </Link>
        ) : (
          <h1></h1>
        )}

        <button className="button display-left"onClick={linkEvent({length: this.lengthArray, direction: -1, instance: this}, changeImage)}>{props.left_name}</button>
        <button className="button display-right" onClick={linkEvent({length: this.lengthArray, direction: 1, instance: this}, changeImage)}>{props.right_name}</button>
      </div>

    );
  }
})

export default EventsCarousel;
