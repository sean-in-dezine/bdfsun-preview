function documentOffsetTop(el) {
    let top = 0
    for (; el; el = el.offsetParent) top += el.offsetTop
    return top
}

let os_lightbox_1 = document.querySelector('.os_img_1')
let os_lightbox_2 = document.querySelector('.os_img_2')
let os_lightbox_3 = document.querySelector('.os_img_3')
let os_lightbox_4 = document.querySelector('.os_img_4')


os_lightbox_1.addEventListener('click', makeOsBig)
os_lightbox_2.addEventListener('click', makeOsBig)
os_lightbox_3.addEventListener('click', makeOsBig)
os_lightbox_4.addEventListener('click', makeOsBig)


let os_gallery_lightbox = document.querySelector('.os_gallery_lightbox')
let os_gallery_source = document.querySelector('.os_gallery_source')


let os_bottombar = document.querySelector('.story > .bottom_bar')
let os_bottomtext = document.querySelector('.story > .bottom_text')
let os_imgs = document.querySelectorAll('.os_img')
let os_texts = document.querySelectorAll('.os_text')

function os_blurAll() {
    for (const element of os_imgs) {
        element.classList.add('blur')
    }
    for (const element of os_texts) {
        element.classList.add('blur')
    }
    os_bottombar.classList.add('blur')
    os_bottomtext.classList.add('blur')
}

function os_unblurAll() {
    for (const element of os_imgs) {
        element.classList.remove('blur')
    }
    for (const element of os_texts) {
        element.classList.remove('blur')
    }
    os_bottombar.classList.remove('blur')
    os_bottomtext.classList.remove('blur')
}

function hideOsLightbox() {
    os_gallery_lightbox.style.display = 'none'

}

hideOsLightbox()


let backbtn2hide = document.querySelector('.daBackButton')

function destroyBackButton() {
    backbtn2hide.style.display = 'none'
}

let currentSource

function makeOsBig(ev) {
    os_blurAll()
    os_gallery_lightbox.style.display = 'grid'
    os_gallery_source.src = ev.target.src
    currentSource = ev.target.src

    let top = documentOffsetTop(os_gallery_source) - (window.innerHeight / 2)
    window.scrollTo(0, top + 250)
    destroyBackButton()

}

let exit_os_cycle = document.querySelector('.exit_os_cycle')
exit_os_cycle.addEventListener('click', closeOsLightbox)

let os_gallery_container = document.querySelector('.os_gallery_container')

function closeOsLightbox() {
    os_unblurAll()
    os_gallery_lightbox.style.display = 'none'


    let top = documentOffsetTop(os_gallery_container) - (window.innerHeight / 2)
    window.scrollTo(0, top + 250)
    backbtn2hide.style.display = 'grid'
}


let os_cycle_right = document.querySelector('.os_cycle_right')
let os_cycle_left = document.querySelector('.os_cycle_left')

let nextSource
let backSource

os_cycle_right.addEventListener('click', iteratePosition)
os_cycle_left.addEventListener('click', iteratePosition)

function iteratePosition(ev) {

    let left_of_string = currentSource.split('(')
    let right_of_string = left_of_string[1].split(')')

    let currentIteration = right_of_string[0]
    currentIteration = parseInt(currentIteration)

    let blanksource
    let newsource
    if (ev.target == os_cycle_right) {

        if (currentIteration !== 12) {

            blanksource = `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${currentIteration + 1}).jpg`
        } else if (currentIteration == 12) {

            blanksource = `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${1}).jpg`
        }

    } else if (ev.target == os_cycle_left) {

        if (currentIteration !== 1) {

            blanksource = `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${currentIteration - 1}).jpg`
        } else if (currentIteration == 1) {

            blanksource = `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${12}).jpg`
        }

    } else {
    }


    os_gallery_source.src = blanksource
    currentSource = blanksource

}
