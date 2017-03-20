const API = 'http://192.168.0.138:4000/api/';

// GET list of all events from API
function getEventList() {
  return fetch(`${API}events`)
    .then(_verifyResponse, _handleError);
}

// GET list of all events filtered by city_id and active from API
function getEventListByCityId(city_id) {
  return fetch(`${API}citys/${city_id}/events/`)
    .then(_verifyResponse, _handleError);
}

// GET list of all carousel_events filtered by city_id and active from API
function getCarouselEventListByCityId(city_id) {
  return fetch(`${API}citys/${city_id}/carousel_events/`)
    .then(_verifyResponse, _handleError);
}

// GET a events's detail info from API by ID
function getEvent(id) {
  return fetch(`${API}events/${id}`)
    .then(_verifyResponse, _handleError);
}

// GET list of citys
function getCityList() {
  return fetch(`${API}citys`)
    .then(_verifyResponse, _handleError);
}

// GET list of categories
function getCategoriesList() {
  return fetch(`${API}categories`)
    .then(_verifyResponse, _handleError);
}

// GET list of events by category id and city id
function getEventListByCityIdCategoryId(city_id, category_id) {
  return fetch(`${API}citys/${city_id}/categories/${category_id}/events`)
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
const ApiService = { getEventList, getEvent, getCityList, getEventListByCityId, getCarouselEventListByCityId, getCategoriesList, getEventListByCityIdCategoryId };
export default ApiService;
