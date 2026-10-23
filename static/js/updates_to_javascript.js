// all under sunflower festival page

let weekend_button = document.getElementById('weekend_button')
let weekday_button = document.getElementById('weekday_button')
let community_button = document.getElementById('community_button')

// our farm
let story_button = document.querySelector('.story_button')
let vision_button = document.querySelector('.vision_button')
let partner_button = document.querySelector('.partner_button')

// insects
let asian_button = document.querySelector('.asian_button')
let bumblebee_button = document.querySelector('.bumblebee_button')
let cabbage_button = document.querySelector('.cabbage_button')
let corn_button = document.querySelector('.corn_button')
let differential_button = document.querySelector('.differential_button')
let fall_button = document.querySelector('.fall_button')
let goldenrod_button = document.querySelector('.goldenrod_button')
let hawaiian_button = document.querySelector('.hawaiian_button')
let monarch_button = document.querySelector('.monarch_button')
let pipevine_button = document.querySelector('.pipevine_button')
let seven_button = document.querySelector('.seven_button')
let western_button = document.querySelector('.western_button')

// The *_button classes sit on the <p> inside each insect <button>, so clicks on the
// button's padding did nothing. Listen on the enclosing <button> instead.
function onButton(el, handler) {
  (el.closest('button') || el).addEventListener('click', handler)
}

onButton(asian_button, io_asian)

function getScreen() {
  let screen = document.querySelector(`.${display}`)
  screen.style.display = 'grid'
}

function io_asian(ev) {
  ev.preventDefault()
  display = "io_asian"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)


}

onButton(bumblebee_button, io_bumblebee)

function io_bumblebee(ev) {
  ev.preventDefault()
  display = "io_bumblebee"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

onButton(cabbage_button, io_cabbage)

function io_cabbage(ev) {
  ev.preventDefault()
  display = "io_cabbage"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

onButton(corn_button, io_corn)

function io_corn(ev) {
  ev.preventDefault()
  display = "io_corn"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}


onButton(differential_button, io_differential)

function io_differential(ev) {
  ev.preventDefault()
  display = "io_differential"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

onButton(fall_button, io_fall)

function io_fall(ev) {
  ev.preventDefault()
  display = "io_fall"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

onButton(goldenrod_button, io_goldenrod)

function io_goldenrod(ev) {
  ev.preventDefault()
  display = "io_goldenrod"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

onButton(hawaiian_button, io_hawaiian)

function io_hawaiian(ev) {
  ev.preventDefault()
  display = "io_hawaiian"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

onButton(monarch_button, io_monarch)

function io_monarch(ev) {
  ev.preventDefault()
  display = "io_monarch"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

onButton(pipevine_button, io_pipevine)

function io_pipevine(ev) {
  ev.preventDefault()
  display = "io_pipevine"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

onButton(seven_button, io_seven)

function io_seven(ev) {
  ev.preventDefault()
  display = "io_seven"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

onButton(western_button, io_western)

function io_western(ev) {
  ev.preventDefault()
  display = "io_western"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)

}






story_button.addEventListener('click', story)
vision_button.addEventListener('click', vision)
partner_button.addEventListener('click', partner)

function story() {
  display = "story"
  hideChildren()
  let story_screen = document.querySelector('.story')
  story_screen.style.display = 'grid'
  window.scrollTo(0, 0)
  os_default()
}

function vision() {
  display = "vision"
  hideChildren()
  let vision_screen = document.querySelector('.vision')
  vision_screen.style.display = 'grid'
  window.scrollTo(0, 0)
  vs_galleryDefault()
}

function partner() {
  display = "partner"
  hideChildren()
  let partner_screen = document.querySelector('.partner')
  partner_screen.style.display = "grid"
  window.scrollTo(0, 0)
  changeShopSticky("Become a Sponsor")
}


weekend_button.addEventListener('click', weekend)

function weekend() {
  display = "weekend"
  hideChildren()
  let weekend_screen = document.querySelector('.weekend')
  weekend_screen.style.display = 'grid'
  window.scrollTo(0, 0)


}

weekday_button.addEventListener('click', weekday)

function weekday() {
  display = "weekday"
  hideChildren()
  let weekday_screen = document.querySelector('.weekday')
  weekday_screen.style.display = 'grid'
  window.scrollTo(0, 0)
}

community_button.addEventListener('click', community)

function community() {
  display = "community"
  hideChildren()
  let community_screen = document.querySelector('.community')
  community_screen.style.display = 'grid'
  window.scrollTo(0, 0)
  changeShopSticky("Learn More")
}






let wend_img_slider = document.querySelector('.wend_img_slider')

let zed = 1

function setWendImg() {
  //console.log('setting wend image')
  let imgsrc = `${static_url}img/sunflower_festival/weekend_activities/weekend_content_${zed}.jpg`
  // wend_img_slider.setAttribute("src", imgsrc)
  let wend2_img = document.querySelector('.wend2_image')

  wend2_img.style.backgroundImage = `url(${imgsrc})`

  return zed
}

setWendImg()
// let arrow_left = document.querySelector('.arrow_left')
// let arrow_right = document.querySelector('.arrow_right')

let arrow_left = document.querySelector("body > div.static_and_immovable > div.changeable_content > div.weekend > div.wend2_slider > div > div.wend_left_arrow > img")
let arrow_right = document.querySelector("body > div.static_and_immovable > div.changeable_content > div.weekend > div.wend2_slider > div > div.wend_right_arrow > img")



arrow_left.addEventListener('click', goLeft)

function goLeft() {
  if (zed == 1) {
    zed = 12
  } else {
    zed = zed - 1
  }
  setWendImg()

}

arrow_right.addEventListener('click', goRight)

function goRight() {
  if (zed == 12) {
    zed = 1
  } else {
    zed = zed + 1
  }
  setWendImg()
}

let anatomy_button = document.querySelector('.anatomy_button')
let bloom_button = document.querySelector('.bloom_button')
let choosing_button = document.querySelector('.choosing_button')
let planting_button = document.querySelector('.planting_button')
let caring_button = document.querySelector('.caring_button')
let cutting_button = document.querySelector('.cutting_button')
let harvesting_button = document.querySelector('.harvesting_button')
let sunflower_button = document.querySelector('.sunflower_button')
let flower_photo_button = document.querySelector('.flower_photo_button')
let pests_button = document.querySelector('.pests_button')

pests_button.addEventListener('click', ed_pests)

function ed_pests(ev) {
  ev.preventDefault()
  display = "ed_pests"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

anatomy_button.addEventListener('click', ed_anatomy)

function ed_anatomy(ev) {
  ev.preventDefault()
  display = "ed_anatomy"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

bloom_button.addEventListener('click', ed_bloom)

function ed_bloom(ev) {
  ev.preventDefault()
  display = "ed_bloom"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

choosing_button.addEventListener('click', ed_choosing)

function ed_choosing(ev) {
  ev.preventDefault()
  display = "ed_choosing"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

planting_button.addEventListener('click', ed_planting)

function ed_planting(ev) {
  ev.preventDefault()
  display = "ed_planting"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}


caring_button.addEventListener('click', ed_caring)

function ed_caring(ev) {
  ev.preventDefault()
  display = "ed_caring"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}



cutting_button.addEventListener('click', ed_cutting)

function ed_cutting(ev) {
  ev.preventDefault()
  display = "ed_cutting"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}


harvesting_button.addEventListener('click', ed_harvesting)

function ed_harvesting(ev) {
  ev.preventDefault()
  display = "ed_harvesting"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}




sunflower_button.addEventListener('click', ed_sunflower)

function ed_sunflower(ev) {
  ev.preventDefault()
  display = "ed_sunflower"
  hideChildren()
  getScreen()
  window.scrollTo(0, 0)
}

//flower_photo_button.addEventListener('click', flower_upload)

function photo_upload(photo_type) {
  //console.log("doing stuff");
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var recaptcha = document.getElementById('g-recaptcha-response').value;
  var photo = document.getElementById('takePhotoButton').files[0];
  // photo taken with the bottom-bar camera badge, if it couldn't be copied into the form's field
  if (!photo && window.bdfBadgePhoto) photo = window.bdfBadgePhoto();
  var formdata = new FormData();
  //var api_url = "/api/upload_flower"
  //formdata.append('flower_pic', photo);
  if (document.getElementById("photo_title").innerHTML == "Upload a Flower Picture") {
    //console.log("flower upload");
    var api_url = "/api/upload_flower"
    formdata.append('flower_pic', photo);
  } else if (document.getElementById("photo_title").innerHTML == "Upload an Insect Picture") {
    //console.log("insect upload");
    var api_url = "/api/upload_insect"
    formdata.append('insect_pic', photo);
  }
  formdata.append('name', name);
  formdata.append('email', email);
  formdata.append('recaptcha', recaptcha);
  formdata.append('phone_number', phone);

  var requestOptions = {
    method: 'POST',
    body: formdata
  };
  let request = fetch(api_url, requestOptions);
  request
    .then(response => {
      const status = response.status;
      //console.log(status);
      //console.log(response.status);
      if (status == 403) {
        // read non 201 response
        response.text().then(res => console.log(res));
        swal("Uh oh " + name, "Your photo could not be uploaded.\nYou are too far away!", "error");
      } else if (status != 201) {
        swal("Uh oh " + name, "Your photo could not be uploaded", "error");
      } else {
        swal("Thank you " + name, "You uploaded your photo", "success");
      }
    })
    .catch(error => {
      console.error('upload failed', error)
      swal("Uh oh " + name, "Your photo could not be uploaded", "error")
    });
    //.then(response => response.text())
    //.then(swal("Thank you " + name, "You uploaded your photo", "success"))
    //.catch(error => console.log('error', error));
  //console.log(name, email, photo);
  //console.log(status);
  //swal("Thank you " + name, "You uploaded your photo", "success");
  back()
  //showPhotoMessage()
}

function takePhoto(ev) {
  //if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
  //}
  if (display !== "photoForm") {

    ev.preventDefault()
    display = "photoForm"
    hideChildren()
    getScreen()
    window.scrollTo(0, 0)
    if (ev.target.innerText == "Take a Picture - Flower") {
      document.getElementById("photo_title").innerHTML = "Upload a Flower Picture";

      // alert('true')
    } else if (ev.target.innerText == "Take a Picture - Insect") {
      document.getElementById("photo_title").innerHTML = "Upload an Insect Picture";

      // alert('true')
    }

    genForm()

  }

}

