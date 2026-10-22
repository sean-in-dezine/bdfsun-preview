// Vision Statement gallery: four photos around a sunflower button. Each tap on the
// sunflower turns it a quarter turn and moves the photos on by one (14 in all, wrapping).
// The photo change is a staggered fade/scale through the centre, using only opacity and
// transform; the next photos are decoded in advance so nothing flashes. Rapid taps keep
// turning the flower and the photos catch up to the last one in a single transition.
const VS_GALLERY_COUNT = 14
const VS_DIR = '/bdfsun-preview/static/img/our_farm/Vision Statement/Vision Statement Gallery/'

let vs_gal_1 = document.querySelector('.vs_gal_1')
let vs_gal_2 = document.querySelector('.vs_gal_2')
let vs_gal_3 = document.querySelector('.vs_gal_3')
let vs_gal_4 = document.querySelector('.vs_gal_4')
const vs_slots = [vs_gal_1, vs_gal_2, vs_gal_3, vs_gal_4]
let vs_plug = 1                       // number of the photo in the first slot (1..14)
let vs_shown = 1                      // what the slots show right now
let vs_busy = false
let vs_angle = 0

let inner_circle = document.querySelector('.inner_circle')
inner_circle.addEventListener('click', vsGalleryClick)

const vs_reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const vs_wait = (ms) => new Promise((r) => setTimeout(r, ms))
const vs_src = (n) => `${VS_DIR}vs_gal (${((n - 1) % VS_GALLERY_COUNT + VS_GALLERY_COUNT) % VS_GALLERY_COUNT + 1}).jpg`

const vs_cache = {}
function vs_preload(n) {
    const src = vs_src(n)
    if (!vs_cache[src]) {
        const im = new Image()
        im.decoding = 'async'
        im.src = src
        vs_cache[src] = (im.decode ? im.decode() : new Promise((r) => { im.onload = r })).catch(() => {})
    }
    return vs_cache[src]
}
function vs_preloadAhead() { for (let i = 4; i < 8; i++) vs_preload(vs_plug + i) }

function vs_galleryDefault() {
    vs_plug = vs_shown = 1
    vs_slots.forEach((img, i) => {
        img.classList.remove('vs-out', 'vs-in-start')
        img.style.transitionDelay = ''
        img.setAttribute('src', vs_src(1 + i))
    })
    vs_preloadAhead()
    return vs_plug
}

async function change_vsGallery() {
    if (vs_busy) return                  // the running transition picks up the new vs_plug
    vs_busy = true
    while (vs_shown !== vs_plug) {
        const target = vs_plug
        const srcs = vs_slots.map((_, i) => vs_src(target + i))
        const ready = Promise.race([Promise.all(srcs.map((s, i) => vs_preload(target + i))), vs_wait(900)])
        const fast = vs_reduced()
        // out: staggered fade + shrink towards the sunflower
        vs_slots.forEach((img, i) => { img.style.transitionDelay = fast ? '0ms' : i * 45 + 'ms'; img.classList.add('vs-out') })
        await Promise.all([ready, vs_wait(fast ? 140 : 220 + 3 * 45)])
        // swap all four together while hidden, so the grid never reflows visibly
        vs_slots.forEach((img, i) => {
            img.style.transitionDelay = '0ms'
            img.classList.add('vs-in-start')
            img.classList.remove('vs-out')
            img.setAttribute('src', srcs[i])
        })
        void vs_gallery.offsetWidth
        // in: staggered fade + grow out from the centre
        vs_slots.forEach((img, i) => { img.style.transitionDelay = fast ? '0ms' : i * 60 + 'ms'; img.classList.remove('vs-in-start') })
        vs_shown = target
        await vs_wait(fast ? 160 : 520 + 3 * 60)
        vs_slots.forEach((img) => { img.style.transitionDelay = '' })
    }
    vs_busy = false
    vs_preloadAhead()
    return vs_plug
}

let vs_gallery = document.querySelector('.vs_gallery')

function vsGalleryClick() {
    rotateInnerCircle()
    vs_plug = (vs_plug % VS_GALLERY_COUNT) + 1
    change_vsGallery()
}

// a quarter turn per step; the angle keeps accumulating so it never snaps back to 0
function rotateInnerCircle() {
    vs_angle -= 90
    inner_circle.style.setProperty('--vs-angle', vs_angle + 'deg')
    inner_circle.classList.remove('vs-pop')
    void inner_circle.offsetWidth
    inner_circle.classList.add('vs-pop')
}
inner_circle.addEventListener('animationend', (ev) => { if (ev.animationName === 'vs-pop') inner_circle.classList.remove('vs-pop') })

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