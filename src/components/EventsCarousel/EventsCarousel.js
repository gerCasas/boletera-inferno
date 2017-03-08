import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import './EventsCarousel.css';

function changeImage(obj) {
  const direction = obj.direction;
  const instance = obj.instance;
  const leghtArray = instance.state.images.length;
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

class EventsCarousel extends Component {

  constructor() {
    super();

    this.state = {
      images: ["http://i.imgur.com/w0anexQ.jpg", "http://i.imgur.com/YxuCcfU.jpg", "http://i.imgur.com/wZCBL13.jpg", "http://i.imgur.com/6GNS9MS.jpg"],
      indexImage: 0
    };
  }

  componentDidMount() {
    // update time every x seconds
    this.timer = setInterval(() => {
      var index = (this.state.indexImage + 1);
      const leghtArray = this.state.images.length;
      if (index > (leghtArray-1)) {
        index = 0;
      }
        this.setState({ indexImage: index });
    }, 8000);
  }

  componentWillUnmount() {
    // stop when not renderable
    clearInterval(this.timer);
  }


  render(props, state) {
    return(
      <div className="myCarousel" >
        <div className="col-sm-1" />
        <div className="col-sm-10 App-content container-fluid">
          <img className="mySlides" id="mySlides" src={state.images[state.indexImage]} alt="Flower"  />
          <button className="button display-left"onClick={linkEvent({direction: -1, instance: this}, changeImage)}>{props.left_name}</button>
          <button className="button display-right" onClick={linkEvent({direction: 1, instance: this}, changeImage)}>{props.right_name}</button>
        </div>
        <div className="col-sm-1" />
      </div>
    );
  }
}

export default EventsCarousel;
