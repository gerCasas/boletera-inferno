import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-mobx';
import { Link } from 'inferno-router';
import './CarouselEventsAnimated.css';


function getIndexCarousel(indexActual) {
  if (indexActual === -1) {
    indexActual = 0;
  } else {
    indexActual += 1;
  }
  return indexActual
}

const CarouselEventsAnimated = connect (['myCarouselEvents'],
class CarouselEventsAnimated extends Component {

  active = 1;
  indexActual = -1

  render(props, state) {

    this.active = 1;
    this.indexActual = -1
    for (var i = 0; i < props.myCarouselEvents.data.length; i++) {
      if (this.active) {
        props.myCarouselEvents.data[i].prop_active = "active";
        this.active = 0;
      }else{
        props.myCarouselEvents.data[i].prop_active = "";
      }
      this.indexActual = getIndexCarousel(this.indexActual);
      props.myCarouselEvents.data[i].prop_index = this.indexActual;
    }

    return(

      <div id="my-carousel" className="carousel slide" data-ride="carousel">

        <ol className="carousel-indicators top-porcentaje-ol">
          {
            props.myCarouselEvents.data ? (
              props.myCarouselEvents.data.map((my_carousel_event) => (
                <li data-target="#my-carousel" data-slide-to={my_carousel_event.prop_index} className={my_carousel_event.prop_active + " ce-ol-" + my_carousel_event.event_id}></li>
              ))
            ) : (
              <p></p>
            )
          }
        </ol>

        <div className="carousel-inner" role="listbox">
          {
            props.myCarouselEvents.data ? (
              props.myCarouselEvents.data.map((my_carousel_event) => (
                <div className={ "item " + my_carousel_event.prop_active + " ce-" + my_carousel_event.event_id} style={{backgroundColor:my_carousel_event.color_rgb}}>
                  <Link to={"/events/"+my_carousel_event.event_id} className="Event-clickeable" style={{ cursor: "pointer" }}>
                    <img className="peopleCarouselImg" src={my_carousel_event.image_path} alt="..."/>
                    <div className="carousel-caption"></div>
                  </Link>
                </div>
              ))
            ) : (
              <p></p>
            )
          }
        </div>

        <a className="left carousel-control" href="#my-carousel" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>

        <a className="right carousel-control" href="#my-carousel" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

    );
  }
})

export default CarouselEventsAnimated;
