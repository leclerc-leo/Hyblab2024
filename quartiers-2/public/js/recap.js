//show the map
const recapPage = function () {

  function getInitialZoomLevel() {
    var width = window.innerWidth;
    if (width <= 480) {
        return 13; // Zoom level for mobile devices
    } else if (width <= 768) {
        return 14; // Zoom level for tablets
    } else {
        return 15; // Zoom level for desktop
    }
  }

  function getIconSize() {
    var width = window.innerWidth;
    if (width <= 480) {
        return 50; // Icon size for mobile devices
    } else if (width <= 768) {
        return 60; // Icon size for tablets
    } else {
        return 70; // Icon size for desktop
    }
  }

  // Use the function to set the initial zoom level
  var map = L.map('map').setView([48.10975380676096, -1.6629224283773485], getInitialZoomLevel());

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // define the Icon
  var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [getIconSize(), getIconSize()], // size of the icon
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
  L.marker([48.11154453515815, -1.6660518805101123], {icon: claude}).addTo(map).bindPopup(
    "<div><h3>Claude</h3><img src='https://i.ibb.co/Fq8wjty/claude.png' alt='Claude Image'></div>" +
    "<div>" +
      "<h3>17 Rue de Châteaudun</h3>" +
      "<button id='claude-button' class='popup-button'><a target='_blank' href='https://www.google.com/maps/place/local+libertaire+%22La+Commune%22/@48.1115294,-1.6661136,17z/data=!3m1!4b1!4m6!3m5!1s0x480edf5c8f478afd:0x4b17773367e94451!8m2!3d48.1115294!4d-1.6661136!16s%2Fg%2F11jm5lp9v7?hl=fr&entry=ttu\'>Y aller</a></button>" +
    "</div>"
  );

  L.marker([48.10628791195435, -1.6660237580689445], {icon: marlene}).addTo(map).bindPopup(
    "<div><h3>Marlène</h3><img src='https://i.ibb.co/grH7wvd/marlene.png' alt='Marlène Image'></div>" +
    "<div>" +
      "<h3>34 Bd René Laennec</h3>" +
      "<button id='marlene-button' class='popup-button'><a target=\"_blank\" href=\"https://www.google.com/maps/place/Les+Bavardes/@48.1061729,-1.668653,17z/data=!3m1!4b1!4m6!3m5!1s0x480edf467d5a25d1:0x6c5e499ecdd2ae1a!8m2!3d48.1061729!4d-1.6660781!16s%2Fg%2F11t7cvmf3b?authuser=0&entry=ttu\">Y aller</a></button>" +
    "</div>"
  );

  L.marker([48.112826336880836, -1.664164031084723], {icon: marie}).addTo(map).bindPopup(
    "<div><h3>Marie</h3><img src='https://i.ibb.co/9w2PYTB/marie.png' alt='Marie Image'></div>" +
    "<div>" +
      "<h3>66 Rue de Paris</h3>" +
      "<button id='marie-button' class='popup-button'><a target=\"_blank\" href=\"https://www.google.com/maps/place/Pari-Rennes/@48.1113517,-1.6677568,16.11z/data=!4m6!3m5!1s0x480ede4df99537e9:0x99a93d6dab4a9ce7!8m2!3d48.1125808!4d-1.6642454!16s%2Fg%2F11c5t2yj_6?authuser=0&entry=ttu\">Y aller</a></button>" +
    "</div>"
  );

  L.marker([48.10888969480733, -1.6716351464288817], {icon: frederic}).addTo(map).bindPopup(
    "<div><h3>Frédéric</h3><img src='https://i.ibb.co/n8FW0K5/frederic.png' alt='Frédéric Image'></div>" +
    "<div>" +
      "<h3>17 Rue Jean Marie Duhamel</h3>" +
      "<button id='frederic-button' class='popup-button'><a target=\"_blank\" href=\"https://www.google.com/maps/place/Moulins+de+Rennes/@48.1086963,-1.6741564,17z/data=!3m1!4b1!4m6!3m5!1s0x480edfb52a6c4a27:0x1c11ba8f1ac65c5a!8m2!3d48.1086963!4d-1.6715815!16s%2Fg%2F1tjdw976?authuser=0&entry=ttu\">Y aller</a></button>" +
    "</div>"
  );

  L.marker([48.10717800781931, -1.6726050662616248 ], {icon: joachim}).addTo(map).bindPopup(
    "<div><h3>Joachim</h3><img src='https://i.ibb.co/7KB7V4G/joachim.png' alt='Joachim Image'></div>" +
    "<div>" +
      "<h3>4 Rue du Bois Perrin</h3>" +
      "<button id='joachim-button' class='popup-button'><a target=\"_blank\" href=\"https://www.google.com/maps/place/Village+Alimentaire/@48.1156095,-1.6478996,18z/data=!4m15!1m8!3m7!1s0x480edefbd4d6f49b:0xe3b932316c28a922!2s4+Rue+du+Bois+Perrin,+35700+Rennes!3b1!8m2!3d48.1156374!4d-1.6477877!16s%2Fg%2F11cpfl8nwp!3m5!1s0x480edf087cc3b215:0xc6c301d11212395d!8m2!3d48.1151959!4d-1.6468584!16s%2Fg%2F11rf0qgq5w?authuser=0&entry=ttu\">Y aller</a></button>" +
    "</div>"
  );

  L.marker([48.10732876940272, -1.6711969681481214 ], {icon: nicolas}).addTo(map).bindPopup(
    "<div><h3>Nicolas</h3><img src='https://i.ibb.co/RTFC5SZ/nicolas.png' alt='Nicolas Image'></div>" +
    "<div>" +
      "<h3>17 Rue Saint-Hélier</h3>" +
      "<button id='nicolas-button' class='popup-button'><a target=\"_blank\" href=\"https://www.google.com/maps/place/17+Rue+Saint-Hélier,+35000+Rennes/@48.1072679,-1.6737669,17z/data=!3m1!4b1!4m6!3m5!1s0x480edfb4dabafba9:0xc835e8e812ee792!8m2!3d48.1072643!4d-1.6711866!16s%2Fg%2F11b8v6cg0n?authuser=0&entry=ttu\">Y aller</a></button>" +
    "</div>"
  );

  L.marker([48.10855480875185, -1.6518949960950546 ], {icon: christophe}).addTo(map).bindPopup(
    "<div><h3>Christophe</h3><img src='https://i.ibb.co/zb3pV07/christophe.png' alt='Christophe Image'></div>" +
    "<div>" +
      "<h3>30-32 Bd Villebois Mareuil</h3>" +
      "<button id='christophe-button' class='popup-button'><a target=\"_blank\" href=\"https://www.google.com/maps/place/La+Garden+Partie/@48.1077614,-1.6545521,17z/data=!3m1!4b1!4m6!3m5!1s0x480edf4ff4391ab7:0xf4ba6e1c5a783cf2!8m2!3d48.1077578!4d-1.6519718!16s%2Fg%2F11k2scpt4m?authuser=0&entry=ttu\">Y aller</a></button>" +
    "</div>"
  );

  // on récupère la note de l'utilisateur
  let note = document.querySelector('#note');
  let message = document.querySelector('#message');

  // on regarde dans le localStorage le nombre de oui
  let yesCount = 0;
  let size = localStorage.length;
  for (const item in {...localStorage}) {
    if (item.includes('yes')) {
      yesCount++;
    }
  }
  if (size > 0) {
    note.innerHTML = yesCount + '/' + size;
    note.parentElement.style.backgroundColor = '#4669AA';
    note.style.color = 'white';
    if (yesCount / size === 0) {
      message.innerHTML = 'Ouch ! Pas besoin d\'habiter dans le quartier Thabor Saint-Hélier pour s\'y promener. Vas-y, fonce !';
    }
    if (yesCount / size === 1) {
      message.innerHTML = 'Nous n\'avons plus rien à t\'apprendre, tu connais le quartier par coeur ! Mais est-ce le cas de tes amis? N\'hésite pas à leur envoyer le lien du site afin de le découvrir !';
      // on met la couleur de note en vert
      note.parentElement.style.backgroundColor = '#AAC382';
      note.style.color = 'black';
    }
    else if (yesCount / size >= 0.7) {
      message.innerHTML = 'Tu as découvert quelques-unes des nombreuses initiatives du coin, continue sur ta lancée !';
    }
    else if (yesCount / size >= 0.4) {
      message.innerHTML = 'Tu n\'es ni fan, ni touriste. Continue ta visite, le quartier te réserve encore bien des surprises...';
    }
    else if (yesCount / size >= 0.1) {
      message.innerHTML = 'Tu as découvert quelques-unes des nombreuses initiatives du coin, continue sur ta lancée !';
    }
  }
}
