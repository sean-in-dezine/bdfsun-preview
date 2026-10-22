let vs_img_blur = document.querySelector('.vs_img')
let vs_desc_blur = document.querySelector('.vs_description')
let vs_bottombar = document.querySelector('.vision > .bottom_bar')
let vs_bottomtext = document.querySelector('.vision > .bottom_text')


function blurAll() {

    vs_bottombar.classList.add('blur')
    vs_bottomtext.classList.add('blur')
    vs_img_blur.classList.add('blur')
    vs_desc_blur.classList.add('blur')
    vs_gallery.classList.add('blur')
}


function unblurAll() {

    vs_bottombar.classList.remove('blur')
    vs_bottomtext.classList.remove('blur')
    vs_gallery.classList.remove('blur')
    vs_img_blur.classList.remove('blur')
    vs_desc_blur.classList.remove('blur')
}