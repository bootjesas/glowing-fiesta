import './styles/reset.css';
import './styles/style.css';
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

var slides = document.getElementsByClassName('mySlides');

function switchSlides() {
  var slideCount = slides.length;
  var i = 0;

  // Set first slide visible
  slides[i].style.display = 'block';

  // Switch slide every 10 seconds
  var switchInterval = setInterval(function () {
    i++;
    if (i < slideCount) {
      slides[i - 1].style.display = 'none';
      slides[i].style.display = 'block';
    } else {
      clearInterval(switchInterval);

      // Hide last slide (--> fade out image)
      slides[i - 1].style.display = 'none';

      // Wait 10 seconds, then repeat switchSlides
      setTimeout(switchSlides, 5);
    }
  }, 2000);
}

switchSlides();

// init Swiper:
new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],

  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const loader = document.querySelector('.loader');
const coordinates = [4.883751, 51.302504];
const apiKey =
  'pk.eyJ1IjoiYm9zYXMxIiwiYSI6ImNsZW1rOTQ4cTEwanUzcG44ZWg1Z2drYTkifQ.AWiAIOmLsTIvwi2_oTnX2w';
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates}.json?access_token=${apiKey}`;

async function GetAdressFormCoordinates() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    document.querySelector('#adress').textContent = data.features[0].place_name;
    loader.style.display = 'none'; // Hide loader
  } catch (error) {
    console.log(error);
  }
}

GetAdressFormCoordinates(); // Load address data
