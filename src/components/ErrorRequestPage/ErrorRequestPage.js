import Inferno from 'inferno';
import { Link } from 'inferno-router';
import './ErrorRequestPage.css';

const ErrorRequestPage = function(props) {
  return (
   <div className="error">
     <div className="error-code m-b-10 m-t-35"><i className="fa fa-frown-o"></i></div>
     <h3 className="font-bold">We couldnt find the page</h3>

     <div className="error-desc">
       Sorry, but the page you are looking for was either not found or does not exist. <br/>
       Try refreshing the page or click the button below to go back to the Homepage.
       <div>
          <Link to={"/"}>
            <a className=" login-detail-panel-button btn">
              <i className="fa fa-arrow-left"></i> Go back to Homepage
            </a>
          </Link>
       </div>
     </div>
   </div>
  )
}

export default ErrorRequestPage;
