let img1 = document.querySelector('.os_img_1')
let img2 = document.querySelector('.os_img_2')
let img3 = document.querySelector('.os_img_3')
let img4 = document.querySelector('.os_img_4')

let os_gallery_state = 1


function os_changeState(direction) {

    if (direction == 'right') {
        os_gallery_state = os_gallery_state + 1
    }

    if (direction == 'left') {
        os_gallery_state = os_gallery_state - 1
    }

    if (os_gallery_state == 13) {
        os_gallery_state = 1
    }

    if (os_gallery_state == 0) {
        os_gallery_state = 12
    }


    os_default()
    return os_gallery_state

}

function os_default() {

    if (os_gallery_state == 12) {
        img1.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${os_gallery_state}).jpg`)

        img2.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${1}).jpg`)

        img3.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${2}).jpg`)

        img4.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${3}).jpg`)
    } else if (os_gallery_state == 10) {
        img1.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${os_gallery_state}).jpg`)

        img2.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${os_gallery_state + 1}).jpg`)

        img3.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${12}).jpg`)

        img4.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${1}).jpg`)
    } else if (os_gallery_state == 11) {
        img1.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${os_gallery_state}).jpg`)

        img2.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${os_gallery_state + 1}).jpg`)

        img3.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${1}).jpg`)

        img4.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${2}).jpg`)
    } else {

        img1.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${os_gallery_state}).jpg`)

        img2.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${os_gallery_state + 1}).jpg`)

        img3.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${os_gallery_state + 2}).jpg`)

        img4.setAttribute('src', `/bdfsun-preview/static/img/our_farm/Our Story/Did you Know Gallery/os_did_you_know (${os_gallery_state+3}).jpg`)
    }

}


// left right fnality

let os_left = document.querySelector('.os_left')

os_left.addEventListener('click', osLeft)

function osLeft() {
    os_changeState('left')
    //console.log('left')
}

let os_right = document.querySelector('.os_right')

os_right.addEventListener('click', osRight)

function osRight() {
    os_changeState('right')
    //console.log('right')
}