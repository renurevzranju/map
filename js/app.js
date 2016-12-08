//necessary variables
var map,
    infowindow,
    infoWindows = [],
    windowContent,
    i;
/*=====================MODEL===========================*/
var Model = [
{
  id: '4f2b8fdbe4b01c385d77fc77',
  name: 'La Pasta World',
  address: 'Heritage Town, Puducherry',
  location: {lat: 11.937583, lng: 79.8287393},
  zipcode: 605001
},{
  id: '50cf2437e4b0aceb65a6c455',
  name: 'KFC Restuarant',
  address: 'New # 65, Old # 45, Corner of Rangapillai street & M.G. Road, Puducherry',
  location: {lat: 11.9349881,lng: 79.8267166},
  zipcode: 605001
},{
  id: '4dfb7c502271baece2433cb8',
  name: 'Cafe Xtasi',
  address: 'Shop No.245, Mission Street, MG Road Area, Opposite VOC School, MG Road Area, Puducherry',
  location: {lat: 11.933771, lng: 79.8287013},
  zipcode: 605001 
},{
  id: '50d348bfe4b0656ca6041368',
  name: 'Richy Rich',
  address: 'No. 25, Nehru Street, MG Road Area, Puducherry ',
  location: {lat: 11.934854, lng: 79.8290742},
  zipcode: 605001
},{
  id: '4dfcb501483b96a3aaa6a3d1',
  name: 'Sri Krishna Sweets',
  address: '86, Mission Street, Near Perumal Temple, Mission Street, Heritage Town, Puducherry',
  location: {lat: 11.93764, lng: 79.8293213},
  zipcode: 605001
},{
  id: '52459570498e4ebe801c20f4',
  name: 'Dominos Pizza',
  address: 'TS. No. 120 & 121, Door No. 56, First & Second Floor, Anantha Rangapillai Street, MG Road Area,Puducherry',
  location: {lat: 11.934935, lng: 79.8286153},
  zipcode: 605001
},{
  id: '4d58b147577aa09306e354b9',
  name: 'Daily Bread',
  address: 'H.M.Kassim Salai, MG Road Area, Puducherry',
  location: {lat: 11.9357393, lng: 79.8293871},
  zipcode: 605001
},{
  id: '4d98190ca2c65481ef48ea53',
  name: 'Wangs Kitchen',
  address: 'First Floor, 42, H.M.Kassim Salai, MG Road Area,  Puducherry',
  location: {lat: 11.9350477,lng: 79.8303227},
  zipcode: 605001
},{
  id: '50ec5324e4b0cc14a14850b8',
  name: 'Adyar Anandha Bhavan',
  address: 'Canteen St, MG Road Area,  Puducherry',
  location: {lat: 11.9357136, lng: 79.8308199},
  zipcode: 605001
}];

//side nav bar function
(function() {
            
var bodyEl = $('body'),
  navToggleBtn = bodyEl.find('.nav-toggle-btn');
  //function to occur when we click the nav-toggle-button          
  navToggleBtn.on('click', function(e) {
  bodyEl.toggleClass('active-nav'); //when clicked it becomes active
  e.preventDefault(); //prevent default actions
  });
})();

//Map Initialization
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 11.93369, lng: 79.827958},
  zoom: 17
  });

  // a new Info Window is created
   infoWindow = new google.maps.InfoWindow();

   // Event that closes the Info Window with a click on the map
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Finally displayMarkers() function is called to begin the markers creation
   displayMarkers();
   ko.applyBindings (new ViewModel);
}

// This function will iterate over markersData array
// creating markers with createMarker function
function displayMarkers(){

   // this variable sets the map bounds according to markers position
   var bounds = new google.maps.LatLngBounds();
   
   // for loop traverses markersData array calling createMarker function for each marker 
   for (var i = 0; i < Model.length; i++){

      // create latlng property
      Model[i].latlng = new google.maps.LatLng(Model[i].location);

      // create marker for location
      createMarker(Model[i]);

      // marker position is added to bounds variable
      bounds.extend(Model[i].latlng);  
   }

   // Finally the bounds variable is used to set the map bounds
   // with fitBounds() function
   map.fitBounds(bounds);
}

// This function creates each marker and it sets their Info Window content
function createMarker(location){

   var marker = new google.maps.Marker({
      map: map,
      position: location.latlng,
      title: location.name,
      animation: google.maps.Animation.DROP
   });

   location.marker = marker;

   // Push each inforwindow to inforwindows array
      getVenueDetails(location, function(windowContent){
        infoWindow.setContent(windowContent);
        infoWindows.push(infoWindow);
      });
   // This event expects a click on a marker
   // When this event is fired the Info Window content is created
   // and the Info Window is opened.
   google.maps.event.addListener(marker, 'click', function() {

      // Open corresponding infowindow
      getVenueDetails(location, function(windowContent){
        // including content to the Info Window.
        infoWindow.setContent(windowContent);
        // opening the Info Window in the current map and at the current marker location.
        infoWindow.open(map, self);
      });
   });
}
/*========= Foursquare API ===========*/
var baseUrl = 'https://api.foursquare.com/v2/venues/search?',
    clientId = 'MN3FMY4RCEGAZSIKWESCS4QNBPJ3MDYPCKAA0BKUHXPORZQN',
    clientSecret = 'SVE0CF4VKHVDNU1VSG3GQKFJWGCKPNLDJDDSCC5SXG1BZ22P';

function getVenueDetails(location, infoWindowCallback) {
  foursquareUrl = baseUrl + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20161207&query=' + Model[location].id + '&ll=11.93,79.82';
  $.getJSON(foursquareUrl)
  .done(function(data){
    var currentVenue = data.response.venues[0];
    var placeName = currentVenue.name;
    var placeAddress = currentVenue.address.formattedAddress;
    var placePhonenos = (currentVenue.contact.formattedPhone === undefined)? 'None': currentVenue.contact.formattedPhone;
    windowContent = '<div id="iw_container"><p><strong>Name: </strong>' + placeName+ '</p>' +
                    '<p><strong>Address: </strong>  ' + placeAddress + '</p>' +
                    '<p><strong>Phone: </strong>' + placePhonenos + '</p></div>';
    infoWindowCallback(windowContent);
  }).fail(function(error){
      infoWindow.setContent('Fail to connect to Foursquare: ' + error);
    }
  );
}

var place = function(data) {
  this.id = ko.observable(data.id);
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.address);
  this.location = ko.observable(data.location);
  this.marker = ko.observable(data.marker);
}

var ViewModel = function() {
  var self = this;
  self.query = ko.observable('');
  self.allPlaces = ko.observableArray([]);
  self.allMarkers = ko.observableArray(this.marker);

  for (i = 0; i < Model.length; i++) {
    var newPlace = new place(Model[i]);
    self.allPlaces.push(newPlace);
  };
  self.visiblePlaces = ko.observableArray();
  
  
  // All places should be visible at first. We only want to remove them if the
  // user enters some input which would filter some of them out.
  self.allPlaces().forEach(function(place) {
    self.visiblePlaces.push(place);
  });
  
  self.filterMarkers = function() {
    var filter = self.query().toLowerCase();
    
    self.visiblePlaces.removeAll();
    
    // This looks at the name of each places and then determines if the user
    // input can be found within the place name.
    self.allPlaces().forEach(function(place) {
      place.marker().setVisible(false);
      
      if (place.name().toLowerCase().indexOf(filter) !== -1) {
        self.visiblePlaces.push(place);
      }
    });
    
    
    self.visiblePlaces().forEach(function(place) {
      place.marker().setVisible(true);
    });
  };
}

