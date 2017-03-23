import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import './EventPhotosGrid.css';

function expandImage(obj){
  const instance = obj.instance;
  console.log(instance);
}

class EventPhotosGrid extends Component {

  render(props, state) {

    return(
      <div className="row event-details-photos-grid-row">

        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 padding-photo-grid-custom">
          <img className="event-image-photo-grid" src={"http://i.imgur.com/a1E2ofi.jpg"} srcset={"http://i.imgur.com/a1E2ofi.jpg 1000w, http://i.imgur.com/i7FBzzb.jpg 2000w"} alt="..." onClick={linkEvent({instance: this}, expandImage)} />

          <div id="myModal" className="modal">
            <span className="close">&times;</span>
            <img className="modal-content" id="img01" alt=""/>
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
