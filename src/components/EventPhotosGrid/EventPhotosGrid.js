import Inferno from 'inferno';
import Component from 'inferno-component';
import './EventPhotosGrid.css';

class EventPhotosGrid extends Component{

  render(props, state) {

    window.onpopstate = function(event) {
      document.body.className = document.body.className.replace("modal-open","");
      document.body.style = "";
      var modal_backdrop = document.querySelector(".modal-backdrop");
      modal_backdrop.classList.remove("modal-backdrop");
    };

    return(
      <div className="row event-details-photos-grid-row">

        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 padding-photo-grid-custom">

          <img id="asd" data-toggle="modal" data-target="#myModal" className="event-image-photo-grid" src={"http://i.imgur.com/a1E2ofi.jpg"} srcset={"http://i.imgur.com/a1E2ofi.jpg 1000w, http://i.imgur.com/i7FBzzb.jpg 2000w"} alt="..."  />

          <div id="myModal" className="modal fade">
            <div className="modal-content center-modal-content">
              <button type="button" className="close close-button-modal" data-dismiss="modal" aria-hidden="true">&times;</button>
              <img data-toggle="modal" data-target="#myModal" className="img-modal" src={"http://i.imgur.com/i7FBzzb.jpg"} alt="..."  />
            </div>
          </div>

        </div>

        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 padding-photo-grid-custom">
          <img className="event-image-photo-grid" src={"http://i.imgur.com/a1E2ofi.jpg"} srcset={"http://i.imgur.com/a1E2ofi.jpg 1000w, http://i.imgur.com/i7FBzzb.jpg 2000w"} alt="..." />
        </div>

        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 padding-photo-grid-custom">
          <img className="event-image-photo-grid" src={"http://i.imgur.com/a1E2ofi.jpg"} srcset={"http://i.imgur.com/a1E2ofi.jpg 1000w, http://i.imgur.com/i7FBzzb.jpg 2000w"} alt="..." />
        </div>

        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 padding-photo-grid-custom">
          <img className="event-image-photo-grid" src={"http://i.imgur.com/a1E2ofi.jpg"} srcset={"http://i.imgur.com/a1E2ofi.jpg 1000w, http://i.imgur.com/i7FBzzb.jpg 2000w"} alt="..." />
        </div>

        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 padding-photo-grid-custom">
          <img className="event-image-photo-grid" src={"http://i.imgur.com/a1E2ofi.jpg"} srcset={"http://i.imgur.com/a1E2ofi.jpg 1000w, http://i.imgur.com/i7FBzzb.jpg 2000w"} alt="..." />
        </div>

        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 padding-photo-grid-custom">
          <img className="event-image-photo-grid" src={"http://i.imgur.com/a1E2ofi.jpg"} srcset={"http://i.imgur.com/a1E2ofi.jpg 1000w, http://i.imgur.com/i7FBzzb.jpg 2000w"} alt="..." />
        </div>

        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 padding-photo-grid-custom">
          <img className="event-image-photo-grid" src={"http://i.imgur.com/a1E2ofi.jpg"} srcset={"http://i.imgur.com/a1E2ofi.jpg 1000w, http://i.imgur.com/i7FBzzb.jpg 2000w"} alt="..." />
        </div>

        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 padding-photo-grid-custom">
          <img className="event-image-photo-grid" src={"http://i.imgur.com/a1E2ofi.jpg"} srcset={"http://i.imgur.com/a1E2ofi.jpg 1000w, http://i.imgur.com/i7FBzzb.jpg 2000w"} alt="..." />
        </div>

        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 padding-photo-grid-custom">
          <img className="event-image-photo-grid" src={"http://i.imgur.com/a1E2ofi.jpg"} srcset={"http://i.imgur.com/a1E2ofi.jpg 1000w, http://i.imgur.com/i7FBzzb.jpg 2000w"} alt="..." />
        </div>



      </div>
    );
  }
}

export default EventPhotosGrid;
