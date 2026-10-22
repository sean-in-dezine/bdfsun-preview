const VS_GALLERY_COUNT = 14

let vs_gal_1 = document.querySelector('.vs_gal_1')
let vs_gal_2 = document.querySelector('.vs_gal_2')
let vs_gal_3 = document.querySelector('.vs_gal_3')
let vs_gal_4 = document.querySelector('.vs_gal_4')
let vs_plug



let inner_circle = document.querySelector('.inner_circle')

inner_circle.addEventListener('click', vsGalleryClick)

function vs_galleryDefault() {
    vs_plug = 1
    vs_gal_1.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug}).jpg`)
    vs_plug = 2
    vs_gal_2.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug}).jpg`)
    vs_plug = 3
    vs_gal_3.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug}).jpg`)
    vs_plug = 4
    vs_gal_4.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug}).jpg`)

    vs_plug = 1
    return vs_plug
}

function change_vsGallery() {

    if (vs_plug == 11) {
        vs_gal_1.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug + 1}).jpg`)

        vs_gal_2.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug + 2}).jpg`)

        vs_gal_3.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug + 3}).jpg`)

        vs_gal_4.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${1}).jpg`)
    } else if (vs_plug == 12) {

        vs_gal_1.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug + 1}).jpg`)

        vs_gal_2.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug + 2}).jpg`)

        vs_gal_3.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${1}).jpg`)

        vs_gal_4.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${2}).jpg`)

    } else if (vs_plug == 13) {


        vs_gal_1.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug + 1}).jpg`)

        vs_gal_2.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${1}).jpg`)

        vs_gal_3.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${2}).jpg`)

        vs_gal_4.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${3}).jpg`)


    } else if (vs_plug == 14) {


        // vs_gal_1.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${1}).jpg`)

        // vs_gal_2.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${2}).jpg`)

        // vs_gal_3.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${3}).jpg`)

        // vs_gal_4.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${4}).jpg`)

        // vs_plug = 1
        // return vs_plug

        vs_galleryDefault()
    } else {


        vs_gal_1.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug + 1}).jpg`)

        vs_gal_2.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug + 2}).jpg`)

        vs_gal_3.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug + 3}).jpg`)

        vs_gal_4.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${vs_plug + 4}).jpg`)

    }

    return vs_plug
}

let vs_gallery = document.querySelector('.vs_gallery')

// vs_gallery.addEventListener('click', vsGalleryClick)

function vsGalleryClick() {
    rotateInnerCircle()

    vs_plug = vs_plug + 1
    change_vsGallery()
    //console.log(vs_plug)


}



function rotateInnerCircle() {


    if (inner_circle.classList.contains('rotation')) {
        inner_circle.classList.remove('rotation')
        inner_circle.classList.add('rotation_2')
    } else {
        inner_circle.classList.remove('rotation_2')
        inner_circle.classList.add('rotation')
    }

    if (inner_circle.classList.contains('inner_circle')) {
        inner_circle.classList.remove('inner_circle')
        inner_circle.classList.add('inner_circle_2')
    } else {
        inner_circle.classList.remove('inner_circle_2')
        inner_circle.classList.add('inner_circle')
    }


}



// !VS

let vs_lightbox_1 = document.querySelector('.vs_gal_1')
let vs_lightbox_2 = document.querySelector('.vs_gal_2')
let vs_lightbox_3 = document.querySelector('.vs_gal_3')
let vs_lightbox_4 = document.querySelector('.vs_gal_4')


vs_lightbox_1.addEventListener('click', specBlowUp)
vs_lightbox_2.addEventListener('click', specBlowUp)
vs_lightbox_3.addEventListener('click', specBlowUp)
vs_lightbox_4.addEventListener('click', specBlowUp)

let spec_img = document.querySelector('.vs_gallery > img')
spec_img.addEventListener('click', specBlowUp)

let vs_gallery_lightbox = document.querySelector('.vs_spec_img')
let vs_gallery_source = document.querySelector('.vs_gallery_source')

function hideVsLightbox() {
    vs_gallery_lightbox.style.display = 'none'
}
hideVsLightbox()

let vs_currentSource

function specBlowUp(ev) {
    blurAll()
    vs_gallery_lightbox.style.display = 'grid'
    vs_gallery_source.src = ev.target.src
    vs_currentSource = ev.target.src

    let top = documentOffsetTop(vs_gallery_source) - (window.innerHeight / 2)
    window.scrollTo(0, top + 250)
    destroyBackButton()


}

let exit_vs_cycle = document.querySelector('.exit_vs_cycle')
exit_vs_cycle.addEventListener('click', closeVsLightbox)

let vs_gallery_container = document.querySelector('.vs_gallery')


function closeVsLightbox() {
    unblurAll()
    vs_gallery_lightbox.style.display = 'none'


    let top = documentOffsetTop(vs_gallery_container) - (window.innerHeight / 2)
    window.scrollTo(0, top + 250)
    backbtn2hide.style.display = 'grid'
}


let vs_cycle_right = document.querySelector('.vs_cycle_right')
let vs_cycle_left = document.querySelector('.vs_cycle_left')

let vs_nextSource
let vs_backSource

vs_cycle_right.addEventListener('click', vs_iteratePosition)
vs_cycle_left.addEventListener('click', vs_iteratePosition)

function vs_iteratePosition(ev) {

    let left_of_string = vs_currentSource.split('(')
    let right_of_string = left_of_string[1].split(')')

    let currentIteration = right_of_string[0]
    currentIteration = parseInt(currentIteration)

    let blanksource
    let newsource
    if (ev.target == vs_cycle_right) {

        if (currentIteration < VS_GALLERY_COUNT) {

            blanksource = `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${currentIteration + 1}).jpg`
        } else {

            blanksource = `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${1}).jpg`
        }

    } else if (ev.target == vs_cycle_left) {

        if (currentIteration > 1) {

            blanksource = `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${currentIteration - 1}).jpg`
        } else {

            blanksource = `/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/vs_gal (${VS_GALLERY_COUNT}).jpg`
        }

    } else {
    }


    vs_gallery_source.src = blanksource
    vs_currentSource = blanksource

}