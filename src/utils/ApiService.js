const API = 'http://localhost:4000/api/';

// GET list of all dinosaurs from API
function getEventList() {
  return fetch(`${API}events`)
    .then(_verifyResponse, _handleError);
}

// GET a dinosaur's detail info from API by ID
function getEvent(id) {
  return fetch(`${API}events/${id}`)
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

// Export ApiService
const ApiService = { getEventList, getEvent };
export default ApiService;
