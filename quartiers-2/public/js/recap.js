/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// to return to a new page
function redirectToPage(url) {
  window.location.href = url;
};

//show the map
var map = L.map('map').setView([48.10975380676096, -1.6629224283773485], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// define the Icon
var LeafIcon = L.Icon.extend({
  options: {
      iconSize:     [38, 30],
      iconAnchor:   [0, 0], //offset of icon
      popupAnchor:  [0, 0]  //offset of popup
  }
});

//define the images for different icons
var claude = new LeafIcon({iconUrl: 'https://i.ibb.co/Fq8wjty/claude.png'}),
    marlene = new LeafIcon({iconUrl: 'https://i.ibb.co/grH7wvd/marlene.png'}),
    marie = new LeafIcon({iconUrl: 'https://i.ibb.co/9w2PYTB/marie.png'}),
    frederic = new LeafIcon({iconUrl: 'https://i.ibb.co/n8FW0K5/frederic.png'}),
    joachim = new LeafIcon({iconUrl: 'https://i.ibb.co/7KB7V4G/joachim.png'}),
    nicolas = new LeafIcon({iconUrl: 'https://i.ibb.co/RTFC5SZ/nicolas.png'}),
    christophe = new LeafIcon({iconUrl: 'https://i.ibb.co/zb3pV07/christophe.png'});


//create the marker
L.marker([48.11154453515815, -1.6660518805101123], {icon: claude}).addTo(map).bindPopup("<h3>Claude</h3><img src='https://i.ibb.co/Fq8wjty/claude.png' alt='Claude Image'>" +
"<button id='claude-button' class='popup-button'>Découvrez Son Histoire</button>");
L.marker([48.10628791195435, -1.6660237580689445], {icon: marlene}).addTo(map).bindPopup("<h3>Marlène</h3><img src='https://i.ibb.co/grH7wvd/marlene.png' alt='Marlène Image'>" +
"<button id='marlene-button' class='popup-button'>Découvrez Son Histoire</button>");
L.marker([48.112826336880836, -1.664164031084723], {icon: marie}).addTo(map).bindPopup("<h3>Marie</h3><img src='https://i.ibb.co/9w2PYTB/marie.png' alt='Marie Image'>" +
"<button id='marie-button' class='popup-button'>Découvrez Son Histoire</button>");
L.marker([48.10888969480733, -1.6716351464288817], {icon: frederic}).addTo(map).bindPopup("<h3>Frédéric</h3><img src='https://i.ibb.co/n8FW0K5/frederic.png' alt='Frédéric Image'>" +
"<button id='frederic-button' class='popup-button'>Découvrez Son Histoire</button>");
L.marker([48.10717800781931, -1.6726050662616248 ], {icon: joachim}).addTo(map).bindPopup("<h3>Joachim</h3><img src='https://i.ibb.co/7KB7V4G/joachim.png' alt='Joachim Image'>" +
"<button id='joachim-button' class='popup-button'>Découvrez Son Histoire</button>");
L.marker([48.10732876940272, -1.6711969681481214 ], {icon: nicolas}).addTo(map).bindPopup("<h3>Nicolas</h3><img src='https://i.ibb.co/RTFC5SZ/nicolas.png' alt='Nicolas Image'>" +
"<button id='nicolas-button' class='popup-button'>Découvrez Son Histoire</button>");
L.marker([48.10855480875185, -1.6518949960950546 ], {icon: christophe}).addTo(map).bindPopup("<h3>Christophe</h3><img src='https://i.ibb.co/zb3pV07/christophe.png' alt='Christophe Image'>" +
"<button id='christophe-button' class='popup-button'>Découvrez Son Histoire</button>");

document.addEventListener('DOMContentLoaded', function() {

  console.log("DOMContentLoaded event fired");



  // get all buttons classified as 'popup-button' 
  var popupButtons = document.querySelectorAll('.popup-button');

  console.log("Buttons with '.popup-button' class:", popupButtons);

  // add listener to each button
  popupButtons.forEach(function(button) {
      button.addEventListener('click', function() {
          // add logic to button according to the unique id
          var buttonId = button.id;
          switch (buttonId) {
              case 'claude-button':
                  redirectToPage('recap.html');
                  break;
              case 'marlene-button':
                  redirectToPage('recap.html');
                  break;
              case 'marie-button':
                  redirectToPage('recap.html');
                  break;
              case 'frederic-button':
                  redirectToPage('recap.html');
                  break;
              case 'joachim-button':
                  redirectToPage('recap.html');
                  break;
              case 'nicolas-button':
                  redirectToPage('recap.html');
                  break;
              case 'christophe-button':
                  redirectToPage('recap.html');
                  break;
                  
              // 添加其他按钮的逻辑
          }
      });
  });
});
