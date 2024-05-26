// Autocomplet widget examples
$(function () {
  var availableTags = [
    "Check-In",
    "Diary",
    "Dota",
    "Game Night",
    "GameWiki",
    "Marathon",
    "Metro",
    "Payday",
    "Tools",
    "Tournament",
    "Witcher"
  ];
 
  $("#tags").autocomplete({
    source: availableTags
  });
});

$(document).ready(function () {
  $('.slick-slider').slick({
    // Slick options for horizontal sliding
    infinite: true,
    slidesToShow: 3, // Number of games to show at once
    slidesToScroll: 1, // Number of games to scroll at once
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
  });
});



window.addEventListener('scroll', function () {
  var frame = document.querySelector('.frame');
  var framePosition = frame.getBoundingClientRect().top;
  var screenPosition = window.innerHeight / 1.3; // Adjust this value as needed

  if (framePosition < screenPosition) {
    frame.classList.add('in-view');
  } else {
    frame.classList.remove('in-view');
  }
});



$(document).ready(function () {
  // YouTube video options
  var options = {
    containment: '#youtube-video', // Videoyu içeren element
    quality: 'hd1080', // Video kalitesi
    showControls: true, // Kontrolleri göster
  };

  // jQuery.mb.YTPlayer ile YouTube videosunu yükleme
  $('#youtube-video').YTPlayer({
    videoURL: 'https://www.youtube.com/watch?v=zqOUr6ev2q8', // YouTube video URL'si
    containment: '#youtube-video', // Videoyu içeren element
    quality: 'hd1080', // Video kalitesi
    showControls: true, // Kontrolleri göster
    autoPlay: false // Otomatik oynatma
  });
});



