import Inferno from 'inferno';
import Component from 'inferno-component';
import './TestCarousel.css';


class TestCarousel extends Component {

  render(props, state) {

    return(
      <section className="section-white">
        <div className="container">

          <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

            <ol className="carousel-indicators">
              <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
              <li data-target="#carousel-example-generic" data-slide-to="1"></li>
              <li data-target="#carousel-example-generic" data-slide-to="2"></li>
            </ol>


            <div className="carousel-inner">
              <div className="item active">
                <img src="http://placehold.it/800x400" alt="..."/>
                <div className="carousel-caption">
                  <h2>Heading</h2>
                </div>
              </div>
              <div className="item">
                <img src="http://placehold.it/800x400" alt="..."/>
                <div className="carousel-caption">
                  <h2>Heading</h2>
                </div>
              </div>
              <div className="item">
                <img src="http://placehold.it/800x400" alt="..."/>
                <div className="carousel-caption">
                  <h2>Heading</h2>
                </div>
              </div>
            </div>


            <a className="left carousel-control" href="#carousel-example-generic" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left"></span>
            </a>
            <a className="right carousel-control" href="#carousel-example-generic" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right"></span>
            </a>
          </div>

        </div>
      </section>
    );
  }
}

export default TestCarousel;
