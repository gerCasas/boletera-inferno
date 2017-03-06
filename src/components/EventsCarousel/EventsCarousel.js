import Inferno from 'inferno';
import Component from 'inferno-component';
import './EventsCarousel.css';

class EventsCarousel extends Component {

  render(props, state) {

    return(
      <div className="container">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
            <li data-target="#myCarousel" data-slide-to="3"></li>
          </ol>

          <div className="carousel-inner" role="listbox">
            <div className="item active">
              <img src={"http://i.imgur.com/YxuCcfU.jpg"} alt="Chania" width="460" height="345"/>
            </div>

            <div className="item">
              <img src={"http://i.imgur.com/w0anexQ.jpg"} alt="Chania" width="460" height="345"/>
            </div>

            <div className="item">
              <img src={"http://i.imgur.com/wZCBL13.jpg"} alt="Flower" width="460" height="345"/>
            </div>

            <div className="item">
              <img src={"http://i.imgur.com/6GNS9MS.jpg"} alt="Flower" width="460" height="345"/>
            </div>
          </div>

          <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      </div>
    );
  }
}

export default EventsCarousel;
