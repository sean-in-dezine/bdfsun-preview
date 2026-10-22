let logobar = document.querySelector('.sunflower_logo_bar')

const HEADER_TOP = "url('/bdfsun-preview/static/img/main_imgs/Header-Identity2x.jpg')"
const HEADER_SCROLLED = "url('/bdfsun-preview/static/img/main_imgs/ScrollHeaderIdentity2x.jpg')"
let headerScrolled = null

function updateWelcomeTopHeader() {
    headerScrolled = false
    logobar.style.backgroundImage = HEADER_TOP
    logobar.classList.remove('is-scrolled')
}

function checkScroll() {
    const scrolled = window.pageYOffset >= 10
    if (scrolled === headerScrolled) return
    headerScrolled = scrolled
    logobar.style.backgroundImage = scrolled ? HEADER_SCROLLED : HEADER_TOP
    // only styled by desktop.css (slimmer bar on wide screens); no effect on phones
    logobar.classList.toggle('is-scrolled', scrolled)
}

document.addEventListener('scroll', checkScroll, { passive: true })
document.querySelector('.changeable_content').addEventListener('scroll', checkScroll, { passive: true })
