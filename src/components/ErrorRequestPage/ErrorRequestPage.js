import Inferno from 'inferno';
import { Link } from 'inferno-router';
import './ErrorRequestPage.css';

const ErrorRequestPage = function(props) {
  return (
   <div className="error">
     <div className="error-code m-b-10 m-t-35"><i className="fa fa-frown-o"></i></div>
     <h3 className="font-bold">{`No pudimos encontrar la pagina`}</h3>

     <div className="error-desc">
       Lo sentimos, pero la página que estás buscando no se encontró o no existe.<br/>
       Intenta actualizar la página o da clic en el botón inferior para regresar a la pagina principal.
       <div>
          <Link to={"/"}>
            <a className=" login-detail-panel-button btn">
              <i className="fa fa-arrow-left"></i> Regresar a Inicio
            </a>
          </Link>
       </div>
     </div>
   </div>
  )
}

export default ErrorRequestPage;
