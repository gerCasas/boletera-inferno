import Inferno from 'inferno';
import Component from 'inferno-component';
import './TestCarousel.css';


class TestCarousel extends Component {

  render(props, state) {

    return(

        <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

          <ol className="carousel-indicators top-porcentaje-ol">
            <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
            <li data-target="#carousel-example-generic" data-slide-to="3"></li>
          </ol>

          <div className="carousel-inner" role="listbox">
            <div className="item active">
              <img className="peopleCarouselImg" src={"http://i.imgur.com/6GNS9MS.jpg"} alt="..."/>
              <div className="carousel-caption"></div>
            </div>
            <div className="item">
              <img className="peopleCarouselImg" src={"http://i.imgur.com/wZCBL13.jpg"} alt="..."/>
              <div className="carousel-caption"></div>
            </div>
            <div className="item">
              <img className="peopleCarouselImg" src={"http://i.imgur.com/w0anexQ.jpg"} alt="..."/>
              <div className="carousel-caption"></div>
            </div>
            <div className="item">
              <img className="peopleCarouselImg" src={"http://i.imgur.com/YxuCcfU.jpg"} alt="..."/>
              <div className="carousel-caption"></div>
            </div>
          </div>

          <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>

      </div>

    );
  }
}

export default TestCarousel;
