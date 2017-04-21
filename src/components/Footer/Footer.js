import Inferno from 'inferno';
import Component from 'inferno-component';
import './Footer.css';


class Footer extends Component {

  render(props, state) {

    return(
      <footer className="footer">
      <div className="footer-style" id="footer">

          <div className="container-fluid">
           <div className="container">
             <div className="row">
               <div className="col-lg-9  col-md-9 col-sm-9 col-xs-12">
                 <h3> Más información </h3>
                 <ul>
                   <li className="col-xs-4 more-elements"><a href="#"> Tu cuenta </a></li>
                   <li className="col-xs-4 more-elements"><a href="#"> Tus tickets </a></li>
                   <li className="col-xs-4 more-elements"><a href="#"> Ayuda </a></li>
                 </ul>
               </div>

               <div className="social-div col-lg-3  col-md-3 col-sm-3 col-xs-12 ">
                 <ul className="social">
                   <li><a href="https://www.facebook.com/iconosdev/"><i className="fa fa-facebook"></i></a></li>
                   <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                 </ul>
               </div>

               </div>
             </div>
           </div>
         </div>

         <div className="footer-bottom">
           <div className="container">
             <p className="pull-left"> Copyright © Iconos 2017. All right reserved. </p>
             <div className="pull-right">
               <ul className="nav nav-pills payments">
                 <li><i className="fa fa-cc-visa"></i></li>
                 <li><i className="fa fa-cc-mastercard"></i></li>
                 <li><i className="fa fa-cc-amex"></i></li>
                 <li><i className="fa fa-cc-paypal"></i></li>
               </ul>
             </div>
           </div>
         </div>
      </footer>
    );
  }
}

export default Footer;
