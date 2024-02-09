//show the map
const recapPage = function () {

  function getInitialZoomLevel() {
    const height = window.innerHeight;
    if (height <= 480) {
      console.log(14);
      return 12; // Zoom level for mobile devices
    } else if (height <= 768) {
      console.log(15);
      return 13; // Zoom level for tablets
    } else if (height <= 1024) {
      console.log(16);
      return 14; // Zoom level for desktop
    } else {
      console.log(17);
      return 16; // Zoom level for large desktop
    }
  }

  function getIconSize() {
    const height = window.innerHeight;
    if (height <= 480) {
      return 40; // Icon size for mobile devices
    } else if (height <= 768) {
      return 50; // Icon size for tablets
    } else if (height <= 1024) {
      return 60; // Icon size for desktop
    } else {
      return 80; // Icon size for large desktop
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
  const svgNicolas = '<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 203 203" style="enable-background:new 0 0 203 203;" xml:space="preserve"><style type="text/css">.st0{fill:#FFE078;stroke:#000000;}.st1{clip-path:url(#SVGID_00000075132982274226085370000012450640260702803118_);}.st2{fill:#F8E8DB;}.st3{fill:none;stroke:#1D1D1B;stroke-width:0.83;stroke-miterlimit:10;}.st4{fill:#F8E8DB;stroke:#1D1D1B;stroke-width:0.83;stroke-miterlimit:10;}.st5{fill:#1D1D1B;}.st6{fill:none;stroke:#1D1D1B;stroke-width:0.88;stroke-miterlimit:10;}.st7{fill:none;stroke:#F8E8DB;stroke-width:0.88;stroke-miterlimit:10;}</style><circle class="st0" cx="101.5" cy="101.5" r="101"/><g><defs><rect id="SVGID_1_" x="38.5" y="13" width="128.5" height="163"/></defs><clipPath id="SVGID_00000096780948269780225670000008826558515822920349_"><use xlink:href="#SVGID_1_" style="overflow:visible;"/></clipPath><g style="clip-path:url(#SVGID_00000096780948269780225670000008826558515822920349_);"><path class="st2" d="M49.6,94.7c0,0-14.5-2.5-9.4,14.7c0,0,2.8,9.9,12.9,15"/><path class="st3" d="M49.6,94.7c0,0-14.5-2.5-9.4,14.7c0,0,2.8,9.9,12.9,15"/><path class="st2" d="M155.5,94.7c0,0,14.4-3,10,14.4c0,0-2.4,10-12.2,15.5"/><path class="st3" d="M155.5,94.7c0,0,14.4-3,10,14.4c0,0-2.4,10-12.2,15.5"/><path class="st4" d="M102.2,27.7c-15.4,0-48.8,4.1-52.6,42.4c0,0-4.3,56.5,10.3,80.7c7.9,13.1,21.2,24.6,42,24.6c19.5,0,36.1-10.1,43.9-23c4.6-7.6,11.8-26.7,8.7-83.4C154.6,69,154.6,27.7,102.2,27.7L102.2,27.7z"/><path class="st5" d="M79.4,99.7c1.6,0,2.9-1.3,2.9-2.9c0-1.6-1.3-2.9-2.9-2.9c-1.6,0-2.9,1.3-2.9,2.9C76.5,98.4,77.8,99.7,79.4,99.7z"/><path class="st6" d="M85.7,81.9l-9.1,1"/><path class="st5" d="M124.6,99.7c1.6,0,2.9-1.3,2.9-2.9c0-1.6-1.3-2.9-2.9-2.9s-2.9,1.3-2.9,2.9C121.7,98.4,123,99.7,124.6,99.7z"/><path class="st6" d="M118.3,81.9l9.1,1"/><path class="st6" d="M101.8,105.8l-3.1,23.6l7.4,1.5"/><path class="st6" d="M84.7,145c0,0,15.6,11,34.5,0"/><path class="st5" d="M148.3,74.7c3.7,13.9,0.9,38.7-3.3,50.9c-2.1,6.2-7.2,13.9-13.7,12.9c-8.9-1.4-12.5-3-30.2-3c-7.4,0-17.4,0.9-28.5,2.4c-6.4,0.8-12.4-6-13.7-12.3c-5.1-26.1-5.2-39.4-2.6-50.8c3-12.8-4.2-16.7-4.2-16.7c-1.5,4.9-2.2,15.2-2.8,20c0,0-4.2,58.5,15.8,79.9c4.2,4.5,11,14.5,34.5,17.3c11.5,0.9,23.4-1.2,36.7-11.9c10.8-8.7,21.7-20.4,18.4-94.4c0,0-0.7-5.3-2-10.8C152.6,58.2,145.4,63.6,148.3,74.7L148.3,74.7z"/><path class="st7" d="M85.1,155c0,0,17.2,11.9,34.5,0"/><path class="st5" d="M57,67.9c0,0-14.6,2.1-14.6-15.8c0,0-1.4-7.3,7.9-12.7c0,0,7.8-5.8,13.8-10.5c0,0,15-16.4,37.7-16c0,0,7.2,0.2,17.9,6.3c0,0,8.7,4.4,21.8,9c0,0,15.2,6.1,18.3,19.3c0,0,1.7,10.6-6.6,18.2l-5.6,2.2c0,0-16.7-8-43.9-8.2C81.7,59.6,76.5,63.5,57,67.9L57,67.9z"/></g></g></svg>';
  const svgClaude = '<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 203 203" style="enable-background:new 0 0 203 203;" xml:space="preserve"><style type="text/css">.st0{fill:#4669AA;stroke:#000000;}.st1{fill:#F8E8DB;}.st2{fill:#F8E8DB;stroke:#1D1D1B;stroke-miterlimit:10;}.st3{fill:none;stroke:#1D1D1B;stroke-width:1.05;stroke-miterlimit:10;}.st4{fill:none;stroke:#1D1D1B;stroke-miterlimit:10;}.st5{fill:#1D1D1B;}.st6{fill:none;stroke:#000000;stroke-width:1.05;stroke-miterlimit:10;}.st7{fill:none;stroke:#F8E8DB;stroke-width:1.05;stroke-miterlimit:10;}</style><circle class="st0" cx="101.5" cy="101.5" r="101"/><path class="st1" d="M161.9,92.4c0,0,13.8-3.8,11,12.8c0,0-1.6,10.4-12.4,16.2"/><path class="st2" d="M101.4,34.7c-17.2,0-54.5,3.9-58.6,40.2c0,0-7.2,60.2,12.7,83.1c4.7,5.4,14.1,13.9,42.3,15.3c11.3,0.6,36.6-3.2,49.5-14.2c9.1-7.8,18.9-25.6,12.6-85.2C159.8,73.9,159.8,34.7,101.4,34.7L101.4,34.7z"/><path class="st3" d="M99.4,100.7l-2.9,22.1l7,1.4"/><path class="st1" d="M41.8,92.3c0,0-13.9-3.5-10.7,13.1c0,0,2.3,10.6,13.2,16.1"/><path class="st4" d="M41.8,92.3c0,0-13.9-3.5-10.7,13.1c0,0,2.3,10.6,13.2,16.1"/><path class="st5" d="M72.1,98.5c1.5,0,2.7-1.2,2.7-2.7c0-1.5-1.2-2.7-2.7-2.7c-1.5,0-2.7,1.2-2.7,2.7C69.4,97.3,70.6,98.5,72.1,98.5z"/><path class="st5" d="M130.5,98.5c1.5,0,2.7-1.2,2.7-2.7c0-1.5-1.2-2.7-2.7-2.7c-1.5,0-2.7,1.2-2.7,2.7C127.8,97.3,129,98.5,130.5,98.5z"/><path class="st3" d="M127.8,78.7l8.5,4"/><path class="st3" d="M77.9,81.8l-8.5,0.9"/><path class="st6" d="M88.6,29.6c0,0,12.7,5.8,13,11.2"/><path class="st6" d="M101.7,30.7c0,0,7.2,5.5,5.5,10.1"/><path class="st4" d="M161.8,92.4c0,0,13.8-3.9,11.1,12.7c0,0-1.5,10.4-12.3,16.2"/><path class="st5" d="M151,64.4c9.8,30.5,6,51.4,1.9,63.4c-2.1,6.1-8.3,9.8-14.7,8.8c-8.8-1.4-22.4-4.9-39.8-4.9c-7.3,0-24.2,3.8-35.2,5.3c-6.3,0.8-12.1-3.4-13.4-9.6c-5.1-25.8-2.2-47.6,3.1-63c2.9-8.2-3.6-8.4-3.6-8.4c-3.4,5.1-5.7,11.3-6.6,19c0,0-7.2,60.2,12.7,83.1c4.7,5.4,14.1,13.9,42.3,15.3c11.3,0.6,36.6-3.2,49.5-14.2c9.1-7.8,18.9-25.6,12.6-85.2c0,0,0-9-6.4-18.4C153.4,55.5,148.5,56.5,151,64.4L151,64.4z"/><path class="st7" d="M93.9,150.9c0,0,2.7,4.9,11.4,3.3c3.7-0.7,6.7-2.3,11.4-6.6"/></svg>';
  const svgMarlene = '<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 203 203" style="enable-background:new 0 0 203 203;" xml:space="preserve"><style type="text/css">.st0{fill:#AAC382;stroke:#000000;}.st1{clip-path:url(#SVGID_00000165923505587011994060000001796795872692122265_);}.st2{fill:#1D1D1B;}.st3{fill:#F8E8DB;}.st4{fill:none;stroke:#1D1D1B;stroke-width:0.85;stroke-miterlimit:10;}.st5{fill:#F8E8DB;stroke:#1D1D1B;stroke-width:0.83;stroke-miterlimit:10;}</style><circle class="st0" cx="101.5" cy="101.5" r="101"/><g><defs><rect id="SVGID_1_" x="32.4" y="19" width="140" height="153"/></defs><clipPath id="SVGID_00000054968688310117541670000010098562193984541844_"><use xlink:href="#SVGID_1_" style="overflow:visible;"/></clipPath><g style="clip-path:url(#SVGID_00000054968688310117541670000010098562193984541844_);"><path class="st2" d="M101.9,19.7c0,0-59.4-4.9-66.4,59.9c-0.9,8.4-4,18.1-2.9,25.5c1.2,8,2,12.8,1.9,16.6c-0.4,12.1,3.9,13,6.5,23c1.3,4.8,0.5,11.5-2.8,18.6c-1.4,3,0.5,6.6,3.8,7c7.9,1.1,21.2,2.5,42.4,1l4.3-0.5H111l18.7,0.4c20.1,1.4,31.1-0.5,36.7-2.3c2.8-0.9,4.1-4,2.8-6.6c-3.1-6.1-4.2-10.6-2.9-15.6c2.6-10,5.5-10.6,5.3-22.7c-0.1-4.9-0.5-12.7,0.8-23.8c0.9-7.4-2.6-13.7-3.5-22.1c-7-64.9-67.5-58.5-67.5-58.5"/><path class="st3" d="M161.1,90c0,0,15-1.8,8.8,15.6c0,0-5.6,10.6-16.2,15.3"/><path class="st4" d="M161.1,90c0,0,15-1.8,8.8,15.6c0,0-3.4,10-13.9,14.7"/><path class="st3" d="M51.5,122l-3.3-1.7C37.9,115.2,35,105,35,105c-5.3-17.6,9.6-15.1,9.6-15.1"/><path class="st4" d="M50.5,121.7l-2.3-1.3C37.9,115.2,35,105,35,105c-5.3-17.6,9.6-15.1,9.6-15.1"/><path class="st5" d="M101.4,19.7c-15.8,0-53.8,7.1-57.6,46.3c0,0-2.4,41.9,11.8,67.1c11.2,19.9,27.4,36.1,48.8,36.1c20,0,34.5-16.2,44.1-36.1c4-8.2,15.2-30.9,11.3-69.9C159.8,63.2,155.1,19.7,101.4,19.7L101.4,19.7z"/><path class="st2" d="M162.3,89.1c-1.8,6.6-10.4-8.9-17.3-11.2c-26-8.8-43.5-35-43.5-35S89.7,75.9,43.6,89.8c0,0-14.8-58.6,46.9-69.2c0,0,42.7-8.1,63.1,25.3C153.6,45.9,169.7,62.3,162.3,89.1L162.3,89.1z"/><path class="st2" d="M78.3,97.9c1.6,0,3-1.3,3-3s-1.3-3-3-3c-1.6,0-3,1.3-3,3S76.7,97.9,78.3,97.9z"/><path class="st4" d="M84.8,79.6l-9.4,1"/><path class="st2" d="M124.6,97.9c1.6,0,3-1.3,3-3s-1.3-3-3-3c-1.6,0-3,1.3-3,3S123,97.9,124.6,97.9z"/><path class="st4" d="M118.2,79.6l9.4,1"/><path class="st4" d="M101.1,100.3l-3.2,24.2l7.6,1.5"/><path class="st4" d="M84.4,139.7c0,0,16,11.3,35.4,0"/></g></g></svg>';
  const svgMarie = '<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 203 203" style="enable-background:new 0 0 203 203;" xml:space="preserve"><style type="text/css">.st0{fill:#F0AAC8;stroke:#000000;}.st1{clip-path:url(#SVGID_00000119811715178984256230000001688756430036097205_);}.st2{fill:#1D1D1B;}.st3{fill:#F8E8DB;}.st4{fill:none;stroke:#1D1D1B;stroke-width:0.83;stroke-miterlimit:10;}.st5{fill:#F8E8DB;stroke:#1D1D1B;stroke-width:0.83;stroke-miterlimit:10;}.st6{fill:none;stroke:#1D1D1B;stroke-width:0.88;stroke-miterlimit:10;}.st7{fill:none;stroke:#1D1D1B;stroke-width:0.76;stroke-miterlimit:10;}</style><circle class="st0" cx="101.5" cy="101.5" r="101"/><g><defs><rect id="SVGID_1_" x="27" y="21" width="149.8" height="164"/></defs><clipPath id="SVGID_00000032609730033014385890000012969854074865328548_"><use xlink:href="#SVGID_1_"  style="overflow:visible;"/></clipPath><g style="clip-path:url(#SVGID_00000032609730033014385890000012969854074865328548_);"><path class="st2" d="M46.1,117.5c9.6,0,17.4-7.9,17.4-17.6c0-9.7-7.8-17.6-17.4-17.6s-17.4,7.9-17.4,17.6 C28.7,109.6,36.5,117.5,46.1,117.5z"/><path class="st2" d="M46.3,131.2c7.1,0,12.8-5.8,12.8-13c0-7.2-5.7-13-12.8-13c-7.1,0-12.8,5.8-12.8,13 C33.5,125.4,39.2,131.2,46.3,131.2z"/><path class="st2" d="M56.3,145.1c7.1,0,12.8-5.8,12.8-13c0-7.2-5.7-13-12.8-13c-7.1,0-12.8,5.8-12.8,13 C43.6,139.3,49.3,145.1,56.3,145.1z"/><path class="st2" d="M152.4,142.3c7.1,0,12.8-5.8,12.8-13c0-7.2-5.7-13-12.8-13c-7.1,0-12.8,5.8-12.8,13 C139.6,136.5,145.3,142.3,152.4,142.3z"/><path class="st2" d="M158.4,129c7.1,0,12.8-5.8,12.8-13c0-7.2-5.7-13-12.8-13c-7.1,0-12.8,5.8-12.8,13 C145.6,123.2,151.3,129,158.4,129z"/><path class="st2" d="M162.8,116c7.1,0,12.8-5.8,12.8-13c0-7.2-5.7-13-12.8-13c-7.1,0-12.8,5.8-12.8,13 C150,110.2,155.7,116,162.8,116z"/><path class="st2" d="M158.4,107.9c7.1,0,12.8-5.8,12.8-13c0-7.2-5.7-13-12.8-13c-7.1,0-12.8,5.8-12.8,13 C145.6,102.1,151.3,107.9,158.4,107.9z"/><path class="st2" d="M154,89.5c7.1,0,12.8-5.8,12.8-13s-5.7-13-12.8-13c-7.1,0-12.8,5.8-12.8,13 S146.9,89.5,154,89.5z"/><path class="st2" d="M44.1,95.9c9.4,0,17.1-7.8,17.1-17.3c0-9.6-7.6-17.3-17.1-17.3S27,69,27,78.5 C27,88.1,34.6,95.9,44.1,95.9z"/><path class="st2" d="M153.4,87.3c9.4,0,17.1-7.8,17.1-17.3c0-9.6-7.6-17.3-17.1-17.3c-9.4,0-17.1,7.8-17.1,17.3 C136.4,79.6,144,87.3,153.4,87.3z"/><path class="st2" d="M119.1,55.6c9.4,0,17.1-7.8,17.1-17.3c0-9.6-7.6-17.3-17.1-17.3c-9.4,0-17.1,7.8-17.1,17.3 C102,47.9,109.6,55.6,119.1,55.6z"/><path class="st2" d="M73.4,60.8c9.4,0,17.1-7.8,17.1-17.3c0-9.6-7.6-17.3-17.1-17.3s-17.1,7.8-17.1,17.3 C56.3,53,64,60.8,73.4,60.8z"/><path class="st2" d="M46.3,83c7.1,0,12.8-5.8,12.8-13c0-7.2-5.7-13-12.8-13c-7.1,0-12.8,5.8-12.8,13 C33.5,77.2,39.2,83,46.3,83z"/><path class="st2" d="M60.9,71.5c9.8,0,17.7-8,17.7-18c0-9.9-7.9-18-17.7-18s-17.7,8-17.7,18 C43.2,63.5,51.1,71.5,60.9,71.5z"/><path class="st2" d="M46.3,78.8c7.1,0,12.8-5.8,12.8-13c0-7.2-5.7-13-12.8-13c-7.1,0-12.8,5.8-12.8,13 C33.5,73,39.2,78.8,46.3,78.8z"/><path class="st2" d="M56.8,68.5c7.1,0,12.8-5.8,12.8-13s-5.7-13-12.8-13s-12.8,5.8-12.8,13 S49.8,68.5,56.8,68.5z"/><path class="st2" d="M136.9,56.4c7.1,0,12.8-5.8,12.8-13s-5.7-13-12.8-13c-7.1,0-12.8,5.8-12.8,13 S129.9,56.4,136.9,56.4z"/><path class="st2" d="M149.1,71.8c7.1,0,12.8-5.8,12.8-13s-5.7-13-12.8-13c-7.1,0-12.8,5.8-12.8,13 S142,71.8,149.1,71.8z"/><path class="st3" d="M49.6,103.8c0,0-14.7-2.5-9.4,15.1c0,0,2.8,10.2,13,15.3"/><path class="st4" d="M49.6,103.8c0,0-14.7-2.5-9.4,15.1c0,0,2.8,10.2,13,15.3"/><path class="st3" d="M156.3,103.8c0,0,14.5-3.1,10,14.7c0,0-2.4,10.3-12.3,15.8"/><path class="st4" d="M156.3,103.8c0,0,14.5-3.1,10,14.7c0,0-2.4,10.3-12.3,15.8"/><path class="st5" d="M102.6,35.2c-15.5,0-49.2,4.2-53,43.3c0,0-3.2,53.5,11.5,78.2c8,13.4,20.6,27.6,41.6,27.6 c19.7,0,35.3-14.5,43.2-27.7c4.6-7.8,12.6-21.2,9.5-79.2C155.4,77.5,155.4,35.2,102.6,35.2z"/><path class="st2" d="M65.6,65.9c6.9,0,12.5-5.7,12.5-12.7s-5.6-12.7-12.5-12.7c-6.9,0-12.5,5.7-12.5,12.7S58.7,65.9,65.6,65.9z"/><path class="st2" d="M56.8,82c6.9,0,12.5-5.7,12.5-12.7s-5.6-12.7-12.5-12.7c-6.9,0-12.5,5.7-12.5,12.7S49.9,82,56.8,82z"/><path class="st2" d="M53.1,99.9c7.1,0,12.8-5.8,12.8-13s-5.7-13-12.8-13c-7.1,0-12.8,5.8-12.8,13S46.1,99.9,53.1,99.9z"/><path class="st2" d="M115.1,69.2c5.6,0,10.2-4.6,10.2-10.3c0-5.7-4.6-10.3-10.2-10.3c-5.6,0-10.2,4.6-10.2,10.3 C104.9,64.6,109.5,69.2,115.1,69.2z"/><path class="st2" d="M132.4,73.9c5.6,0,10.2-4.6,10.2-10.3c0-5.7-4.6-10.3-10.2-10.3c-5.6,0-10.2,4.6-10.2,10.3 C122.2,69.3,126.7,73.9,132.4,73.9z"/><path class="st2" d="M62.1,86.6c6.3,0,11.3-5.2,11.3-11.5c0-6.4-5.1-11.5-11.3-11.5c-6.3,0-11.3,5.2-11.3,11.5 C50.7,81.4,55.8,86.6,62.1,86.6z"/><path class="st2" d="M120.1,50.9c5.6,0,10.2-4.6,10.2-10.3s-4.6-10.3-10.2-10.3c-5.6,0-10.2,4.6-10.2,10.3 S114.4,50.9,120.1,50.9z"/><path class="st2" d="M73.4,78.5c6.9,0,12.5-5.7,12.5-12.7s-5.6-12.7-12.5-12.7c-6.9,0-12.5,5.7-12.5,12.7 S66.5,78.5,73.4,78.5z"/><path class="st2" d="M84.7,70c6.9,0,12.5-5.7,12.5-12.7s-5.6-12.7-12.5-12.7c-6.9,0-12.5,5.7-12.5,12.7S77.8,70,84.7,70z"/><path class="st2" d="M140.9,71.6c6.9,0,12.5-5.7,12.5-12.7s-5.6-12.7-12.5-12.7c-6.9,0-12.5,5.7-12.5,12.7 S134,71.6,140.9,71.6z"/><path class="st2" d="M150.3,86.6c6.9,0,12.5-5.7,12.5-12.7c0-7-5.6-12.7-12.5-12.7c-6.9,0-12.5,5.7-12.5,12.7 C137.8,80.9,143.4,86.6,150.3,86.6z"/><path class="st2" d="M89.3,51c6.9,0,12.5-5.7,12.5-12.7s-5.6-12.7-12.5-12.7c-6.9,0-12.5,5.7-12.5,12.7 S82.4,51,89.3,51z"/><path class="st2" d="M81,57.3c6.9,0,12.5-5.7,12.5-12.7S87.9,32,81,32c-6.9,0-12.5,5.7-12.5,12.7S74.1,57.3,81,57.3z"/><path class="st2" d="M128.5,60.6c6.9,0,12.5-5.7,12.5-12.7s-5.6-12.7-12.5-12.7c-6.9,0-12.5,5.7-12.5,12.7 S121.6,60.6,128.5,60.6z"/><path class="st2" d="M106.1,53.2c6.9,0,12.5-5.7,12.5-12.7s-5.6-12.7-12.5-12.7c-6.9,0-12.5,5.7-12.5,12.7 S99.2,53.2,106.1,53.2z"/><path class="st2" d="M98.4,65.9c6.9,0,12.5-5.7,12.5-12.7s-5.6-12.7-12.5-12.7c-6.9,0-12.5,5.7-12.5,12.7S91.5,65.9,98.4,65.9z"/><path class="st2" d="M83,109.8c1.6,0,2.9-1.3,2.9-3c0-1.6-1.3-3-2.9-3s-2.9,1.3-2.9,3 C80.1,108.5,81.4,109.8,83,109.8z"/><path class="st6" d="M89.3,91.6l-9.2,1"/><path class="st2" d="M128.5,109.8c1.6,0,2.9-1.3,2.9-3c0-1.6-1.3-3-2.9-3s-2.9,1.3-2.9,3 C125.6,108.5,126.9,109.8,128.5,109.8z"/><path class="st6" d="M122.2,91.6l9.2,1"/><path class="st6" d="M105.5,116l-3.1,24.1l7.5,1.5"/><path class="st6" d="M123.1,156c-19,11.3-34.8,0-34.8,0"/><path class="st2" d="M162.8,103.7c7.7,0,14-6.4,14-14.2c0-7.9-6.3-14.2-14-14.2s-14,6.4-14,14.2 C148.8,97.3,155,103.7,162.8,103.7z"/><path class="st7" d="M75.4,95.9h13.9c5,0,9.1,4.1,9.1,9.2c0,9-7.2,16.2-16,16.2c-8.8,0-16-7.3-16-16.2 C66.4,100,70.4,95.9,75.4,95.9z"/><path class="st7" d="M121.5,95.9h13.9c5,0,9.1,4.1,9.1,9.2c0,9-7.2,16.2-16,16.2c-8.8,0-16-7.3-16-16.2 C112.5,100,116.5,95.9,121.5,95.9z"/></g></g></svg>';
  const svgFrederic = '<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 203 203" style="enable-background:new 0 0 203 203;" xml:space="preserve"><style type="text/css">.st0{fill:#FFE078;stroke:#000000;}.st1{clip-path:url(#SVGID_00000005245716778333365930000007561697912598590611_);}.st2{fill:#F8E8DB;}.st3{fill:none;stroke:#1D1D1B;stroke-miterlimit:10;}.st4{fill:#F8E8DB;stroke:#1D1D1B;stroke-miterlimit:10;}.st5{fill:#1D1D1B;}</style><circle class="st0" cx="101.5" cy="101.5" r="101"/><g><defs><rect id="SVGID_1_" x="35" y="24" width="125.2" height="156.9"/></defs><clipPath id="SVGID_00000130634325646781949630000017770301773794207403_"><use xlink:href="#SVGID_1_"  style="overflow:visible;"/></clipPath><g style="clip-path:url(#SVGID_00000130634325646781949630000017770301773794207403_);"><path class="st2" d="M46.5,100.7c0,0-13.5-3.6-10.2,12.8c0,0,1.7,9.5,10.7,15.1"/><path class="st3" d="M46.5,100.7c0,0-13.5-3.6-10.2,12.8c0,0,1.7,9.5,10.7,15.1"/><path class="st2" d="M148.7,100.7c0,0,13.5-3.6,10.2,12.8c0,0-1.5,8.9-10.6,14.5"/><path class="st3" d="M148.7,100.7c0,0,13.5-3.6,10.2,12.8c0,0-1.5,8.9-10.6,14.5"/><path class="st4" d="M97.3,43.8c-14.6,0-46.4,3.9-49.9,39.6c0,0-6.1,59.2,10.8,81.8c4,5.4,15.8,15,39.8,15c19.3,0,30.6-5.2,40.1-15.1c7.5-7.9,14.4-24,9-82.7C147.1,82.3,147.1,43.8,97.3,43.8L97.3,43.8z"/><path class="st5" d="M46.5,98.5c0,0,14.5-14.5,11.9-39.9c0,0,48.7,21.1,77.8,12.9c0,0,6.6,25.7,12,28.9c0,0,3.3-3.6,2.9-39c0,0,4.7-12.6-1.1-23.4c0,0-16.2-28.3-69.1-4.4l-4-6.5c0,0-24.6,5.9-25.2,26.6C51.8,53.8,32.8,69.4,46.5,98.5L46.5,98.5z"/><path class="st5" d="M76.7,112c1.5,0,2.7-1.2,2.7-2.7s-1.2-2.7-2.7-2.7c-1.5,0-2.7,1.2-2.7,2.7S75.2,112,76.7,112z"/><path class="st3" d="M81,95.4l-8.7,0.9"/><path class="st5" d="M119.6,112c1.5,0,2.7-1.2,2.7-2.7s-1.2-2.7-2.7-2.7s-2.7,1.2-2.7,2.7S118,112,119.6,112z"/><path class="st3" d="M115.2,94.9l8.7,0.9"/><path class="st3" d="M100.2,116.9l-3,22l7.1,1.4"/><path class="st3" d="M85.2,154.6c0,0,14.8,10.3,32.8,0"/></g></g></svg>';
  const svgJoachim = '<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 203 203" style="enable-background:new 0 0 203 203;" xml:space="preserve"><style type="text/css">.st0{fill:#AAC382;stroke:#000000;}.st1{clip-path:url(#SVGID_00000180339522586199542900000015053851074761339062_);}.st2{fill:#F8E8DB;}.st3{fill:none;stroke:#1D1D1B;stroke-width:0.83;stroke-miterlimit:10;}.st4{fill:#F8E8DB;stroke:#1D1D1B;stroke-width:0.83;stroke-miterlimit:10;}.st5{fill:#1D1D1B;}.st6{fill:none;stroke:#1D1D1B;stroke-width:0.88;stroke-miterlimit:10;}</style><circle class="st0" cx="101.5" cy="101.5" r="101"/><g><defs><rect id="SVGID_1_" x="40" y="24" width="123" height="156"/></defs><clipPath id="SVGID_00000122697625540890132200000003588616536445638792_"><use xlink:href="#SVGID_1_"  style="overflow:visible;"/></clipPath><g style="clip-path:url(#SVGID_00000122697625540890132200000003588616536445638792_);"><path class="st2" d="M50.7,100.8c0,0-13.9-2.3-9,14c0,0,2.7,9.4,12.3,14.2"/><path class="st3" d="M50.7,100.8c0,0-13.9-2.3-9,14c0,0,2.7,9.4,12.3,14.2"/><path class="st2" d="M152,100.8c0,0,13.8-2.9,9.5,13.6c0,0-2.3,9.5-11.7,14.7"/><path class="st3" d="M152,100.8c0,0,13.8-2.9,9.5,13.6c0,0-2.3,9.5-11.7,14.7"/><path class="st4" d="M100.7,41.2c-14.8,0-46.7,3.9-50.3,40.2c0,0-3.1,49.6,10.9,72.5c7.6,12.4,19.5,25.6,39.5,25.6c18.7,0,33.6-13.4,41-25.7c4.4-7.2,12-19.7,9-73.4C150.8,80.3,150.8,41.2,100.7,41.2z"/><path class="st5" d="M79.2,105.5c1.5,0,2.8-1.2,2.8-2.7s-1.2-2.7-2.8-2.7c-1.5,0-2.8,1.2-2.8,2.7S77.7,105.5,79.2,105.5z"/><path class="st6" d="M85.2,88.6l-8.7,0.9"/><path class="st5" d="M122.4,105.5c1.5,0,2.8-1.2,2.8-2.7s-1.2-2.7-2.8-2.7c-1.5,0-2.8,1.2-2.8,2.7S120.9,105.5,122.4,105.5z"/><path class="st6" d="M116.4,88.6l8.8,0.9"/><path class="st6" d="M100.6,111.3l-3,22.3l7.1,1.4"/><path class="st6" d="M84.3,148.4c0,0,15.6,18,33,0"/><path class="st5" d="M49.5,98.5c0,0,0-13.6-1.3-25.2c-0.4-3.4-5.9-7.9,2.6-13.6c0,0,2.9-1.6,1.6-5.8c0,0-1.1-8.8,8.7-10.2c0,0,4.5,0,6.7-3.7c0,0,0-14,13.1-16.1c0,0,5.9-0.4,13.2,5.8c0,0,7.2,5.5,16,2.6c0,0,16.8-8.8,31,1.1c0,0,9.4,4.7,5.2,18.7c0,0-0.9,3,2.9,5.3c0,0,6.5,4.9,4.2,14.9c-1.4,6.3-0.3,23.2-1.2,28.4L140.8,71c0,0-3.5-8.6-14.1-5.4c0,0-22.5,5.5-33.3-1.7c0,0-12.1-9.9-19.8-6.6c0,0-7.8,2.1-10.4,11.9C61.2,77,53.7,88.8,49.5,98.5L49.5,98.5z"/><path class="st5" d="M48.8,129.9c1.5,0,2.8-1.2,2.8-2.7s-1.2-2.7-2.8-2.7c-1.5,0-2.8,1.2-2.8,2.7S47.3,129.9,48.8,129.9z"/><path class="st5" d="M153.1,129.9c1.5,0,2.8-1.2,2.8-2.7s-1.2-2.7-2.8-2.7c-1.5,0-2.8,1.2-2.8,2.7S151.6,129.9,153.1,129.9z"/></g></g></svg>';
  const svgChristophe = '<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 203 203" style="enable-background:new 0 0 203 203;" xml:space="preserve"><style type="text/css">.st0{fill:#4669AA;stroke:#000000;}.st1{clip-path:url(#SVGID_00000128452106002137163950000004452970447534282403_);}.st2{fill:#F8E8DB;}.st3{fill:none;stroke:#1D1D1B;stroke-width:0.83;stroke-miterlimit:10;}.st4{fill:#F8E8DB;stroke:#1D1D1B;stroke-width:0.83;stroke-miterlimit:10;}.st5{fill:#1D1D1B;}.st6{fill:none;stroke:#1D1D1B;stroke-width:0.88;stroke-miterlimit:10;}</style><circle class="st0" cx="101.5" cy="101.5" r="101"/><g><defs><rect id="SVGID_1_" x="37" y="20" width="131" height="163"/></defs><clipPath id="SVGID_00000064334402171047250560000008128093662605820546_"><use xlink:href="#SVGID_1_"  style="overflow:visible;"/></clipPath><g style="clip-path:url(#SVGID_00000064334402171047250560000008128093662605820546_);"><path class="st2" d="M48.3,99.4c0,0-14.8-2.5-9.5,15.2c0,0,2.8,10.2,13.1,15.4"/><path class="st3" d="M48.3,99.4c0,0-14.8-2.5-9.5,15.2c0,0,2.8,10.2,13.1,15.4"/><path class="st2" d="M156.3,99.3c0,0,14.7-3.1,10.1,14.8c0,0-2.4,10.3-12.5,15.9"/><path class="st3" d="M156.3,99.3c0,0,14.7-3.1,10.1,14.8c0,0-2.4,10.3-12.5,15.9"/><path class="st4" d="M102,30.3c-15.7,0-49.8,4.2-53.6,43.6c0,0-4.4,58.2,10.5,83c8.1,13.4,21.6,25.3,42.9,25.3c19.9,0,36.9-10.4,44.8-23.7c4.7-7.8,12-27.4,8.9-85.8C155.4,72.8,155.4,30.3,102,30.3L102,30.3z"/><path class="st5" d="M78.7,104.5c1.6,0,2.9-1.3,2.9-3c0-1.6-1.3-3-2.9-3c-1.6,0-2.9,1.3-2.9,3C75.8,103.2,77.1,104.5,78.7,104.5z"/><path class="st6" d="M85.1,86.2l-9.3,1"/><path class="st5" d="M124.8,104.5c1.6,0,2.9-1.3,2.9-3c0-1.6-1.3-3-2.9-3s-2.9,1.3-2.9,3C121.8,103.2,123.1,104.5,124.8,104.5z"/><path class="st6" d="M118.4,86.2l9.3,1"/><path class="st6" d="M101.5,110.7L98.4,135l7.6,1.5"/><path class="st6" d="M84.2,151.1c0,0,15.9,11.3,35.2,0"/><path class="st5" d="M47.8,91.1c0,0,17-12.3,14.4-39.3c0,0,13.6,16,36.2,16c35.2,0,52.8,5.2,57.7,25.2c0,0,5.5-12.1,1.9-41.2c-1.9-15.6-13.2-17.4-22.6-21.5c-8.1-3.6-17-9.9-29.4-4.7c0,0-2.6-6.7-9.4-5.5c-27.9,5-44.6,17-49.3,35C45.2,62.9,43.6,72.5,47.8,91.1z"/></g></g></svg>';

  const claude = new LeafIcon({iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svgClaude)}),
    marlene = new LeafIcon({iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svgMarlene)}),
    marie = new LeafIcon({iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svgMarie)}),
    frederic = new LeafIcon({iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svgFrederic)}),
    joachim = new LeafIcon({iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svgJoachim)}),
    nicolas = new LeafIcon({iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svgNicolas)}),
    christophe = new LeafIcon({iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svgChristophe)});


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

  L.marker([48.115947950372146, -1.6472464900580122  ], {icon: joachim}).addTo(map).bindPopup(
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

  L.marker([48.107792538952154, -1.651956317965408 ], {icon: christophe}).addTo(map).bindPopup(
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
