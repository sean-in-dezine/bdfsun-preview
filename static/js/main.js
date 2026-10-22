let BACK_BUTTON = document.querySelectorAll('.back_button')
for (const button of BACK_BUTTON) {

    button.addEventListener('click', back)
}





function back() {
    window.scrollTo(0, 0)
    updateWelcomeTopHeader()
    //console.log(display)

    // determine what screen you're on
    if (display == "sunflowerFestival" || display == "ourFarm" || display == "insects" || display == "education" || display == "flowerForm") {
        //console.log(display)
        display = "default"
        welcome()
        hideBackButton(display)
        updateWelcomeTopHeader()
        //console.log(display, 'inside of back()')
        return
    } else if (display == "weekend" || display == "weekday" || display == "community") {
        sunflowerFestival()
    } else if (display == "vision" || display == "partner" || display == "story") {
        ourFarm()
    } else if (display == "io_asian" || display == "io_bumblebee" || display == "io_cabbage" || display == "io_corn" || display == "io_differential" || display == "io_fall" || display == "io_goldenrod" || display == "io_hawaiian" || display == "io_monarch" || display == "io_pipevine" || display == "io_seven" || display == "io_western") {
        insects()
    } else if (display == "ed_anatomy" || display == "ed_bloom" || display == "ed_choosing" || display == "ed_planting" || display == "ed_caring" || display == "ed_cutting" || display == "ed_harvesting" || display == "ed_sunflower" || display == "ed_pests") {
        education()
    } else if (display == "photoForm") {
        if (SUNFLOWER_SHOP.textContent == 'Take a Picture - Insect') {
            insects()
        } else if (SUNFLOWER_SHOP.textContent == 'Take a Picture - Flower') {
            education()
        }
    }


}

let daBackButton = document.querySelector('.daBackButton')

function hideBackButton(display) {
    //console.log('hide back button')
    if (display == 'default') {
        daBackButton.style.display = 'none'
    }
}


function displayBackButton(display) {
    //console.log('display back button')
    if (display !== 'default') {
        daBackButton.style.display = 'grid'
    }
}