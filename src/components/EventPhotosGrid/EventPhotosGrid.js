import Inferno from 'inferno';
import Component from 'inferno-component';
import ApiService from '../.././utils/ApiService';
import './EventPhotosGrid.css';

class EventPhotosGrid extends Component{

  componentDidMount() {
    // GET list of event_photos from API
    ApiService.getEventPhotosListByEventId(this.props.event_id).then(
      res => {
        // Set state with fetched city list
        this.setState({
          event_photos: res.data,
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

    window.onpopstate = function(event) {
      document.body.className = document.body.className.replace("modal-open","");
      document.body.style = "";
      var modal_backdrop = document.querySelector(".modal-backdrop");
      if (modal_backdrop != null) {
        modal_backdrop.classList.remove("modal-backdrop");
      }
    };

    let event_photos_label = "";
    if (state.event_photos != null){
      if (state.event_photos.length > 0){
        event_photos_label = <h3>Fotos</h3>;
      }
    }

    return(
      <div className="row event-details-photos-grid-row">
      {event_photos_label}
        {
          state.event_photos ? (
            state.event_photos.map((my_photo) => (
              <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 padding-photo-grid-custom">
                <img id={`photo-grid-` + my_photo.id} data-toggle="modal" data-target={`#myModal-` + my_photo.id} className="event-image-photo-grid" src={my_photo.image_path} srcset={my_photo.image_path + `1000w, ` + my_photo.image_path + ` 2000w`} alt="..."  />

                <div id={`myModal-` + my_photo.id} className="modal fade" tabindex="-1" role="dialog">
                  <div className="modal-dialog">
                    <div className="modal-content center-modal-content" >
                      <button type="button" className="close close-button-modal" data-dismiss="modal" aria-hidden="true">&times;</button>
                      <img data-toggle="modal" data-target={`#myModal-` + my_photo.id} className="img-modal" src={my_photo.image_path} alt="..."  />
                    </div>
                  </div>
                </div>
              </div>

            ))
          ) : (
            <p>..Loading </p>
          )
        }
      </div>
    );
  }
}

export default EventPhotosGrid;
