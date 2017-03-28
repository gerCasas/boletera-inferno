const API = 'https://maps.googleapis.com/maps/api/geocode/json?latlng';
const EXT_PARAMS = '&result_type=administrative_area_level_2&key=AIzaSyA3p3D4zoM1jAW4EMpvzA_J7IABvvFVA6I';

// GET list of all events from API
function getGeolocation(lat,lng) {
  return fetch(`${API}=${lat},${lng}${EXT_PARAMS}`)
    .then(_verifyResponse, _handleError);
}

// Verify that the fetched response is JSON
function _verifyResponse(res) {
  let contentType = res.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return res.json();
  } else {
    _handleError({ message: 'Response was not JSON'});
  }
}

// Handle fetch errors
function _handleError(error) {
  console.error('An error occurred:', error);
  throw error;
}

// Export GeolocationApiService
const GeolocationApiService = { getGeolocation };
export default GeolocationApiService;
