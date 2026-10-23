// sunflower shop

let SUNFLOWER_SHOP = document.querySelector('div>button.sunflower_shop')

//SUNFLOWER_SHOP.addEventListener('click', openSunflowerShop)

SUNFLOWER_SHOP.addEventListener('click', function (event) {
  if (this.innerHTML === 'Take a Picture - Flower') {
    takePhoto.call(this, event, "flower");
    //console.log(this.innerHTML)
  } else if (this.innerHTML === 'Take a Picture - Insect') {
    takePhoto.call(this, event, "insect");
    //console.log(this.innerHTML)
  } else if (this.innerHTML === 'Sunflower Shop') {
    openSunflowerShop.call(this);
    return;
  } else if (this.innerHTML === 'View Events') {
    window.location = 'https://beaverdamsunflowers.com/events/'
  } else if (this.innerHTML === "Learn More") {
    parent.location = "mailto:beaverdamsunflowers@gmail.com"
  } else if (this.innerHTML === "Become a Sponsor") {
    window.location = "https://beaverdamsunflowers.com/sponsors/"
  }

});

function openSunflowerShop() {
  window.location = 'https://beaverdamsunflowers.com/products/'
}


// sunflower (home)

// ! links to vendors

const PARTNER_LINKS = {
  link_0: 'https://www.bankofbotetourt.com/',
  link_1: 'https://www.virginia.org/',
  link_2: 'https://www.aldersoninsurance.com/',
  link_3: 'https://flexphotobooth.smugmug.com/',
  link_4: 'https://www.boonetractor.com/',
  link_5: 'https://www.carmeuse.com/na-en',
  link_6: 'https://www.nerodigitaldesign.com/',
  link_7: 'https://www.yeatho.com/',
}

function openLink(e) {
  for (const cls of e.currentTarget.classList) {
    if (PARTNER_LINKS[cls]) { window.location = PARTNER_LINKS[cls]; return }
  }
}

for (const cls of Object.keys(PARTNER_LINKS)) {
  const el = document.querySelector('.' + cls)
  if (!el) continue
  el.addEventListener('click', openLink)
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLink(e) } })
}


// aug 23 updates


let ed_slider_right = document.querySelector('#ed_slider_right')
let ed_slider_left = document.querySelector('#ed_slider_left')

ed_slider_right.addEventListener('click', edRight)
ed_slider_left.addEventListener('click', edLeft)


let ed_slider_img = document.querySelector('#ed_slider_img')


let eduzed

function setEduImg() {
  eduzed = 8
  ed_slider_img.src = `${static_url}img/Education/Education Main Gallery/edu${eduzed}.jpg`
}
// static/img/Education/Education Main Gallery/edu8.jpg
function edRight() {

  if (eduzed == 19) {
    eduzed = 1
    ed_slider_img.src = `${static_url}img/Education/Education Main Gallery/edu${eduzed}.jpg`
  } else {
    eduzed = eduzed + 1
    ed_slider_img.src = `${static_url}img/Education/Education Main Gallery/edu${eduzed}.jpg`
  }


}

function edLeft() {


  if (eduzed == 1) {
    eduzed = 19
    ed_slider_img.src = `${static_url}img/Education/Education Main Gallery/edu${eduzed}.jpg`

  } else {
    eduzed = eduzed - 1
    ed_slider_img.src = `${static_url}img/Education/Education Main Gallery/edu${eduzed}.jpg`

  }

}