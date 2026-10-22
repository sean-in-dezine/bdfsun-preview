let sample_display = {
    welcome: "default",
    sunflowerFestival: "xxx",
    ourFarm: "xxx",
    insect: "xxx",
    education: "xxx"
}

function cycle(display) {
    if (display == "default") {
        //console.log('cycle')
        welcome()
        return
    }


    // if (display == "ourFarm") {
    //     ourFarm()
    //     return
    // }
    // if (display == "sunflowerFestival") {
    //     sunflowerFestival()
    //     return
    // }
    // if (display == "insects") {
    //     insect()
    //     return
    // }
    // if (display == "education") {
    //     education()
    //     return
    //}
    else {
        console.warn('the cycle(display) function did not function properly')
        console.error('check cycle(display) function inside of cycle.js, display did not equal the accepted parameters')
        //console.log(display)
        console.warn('the above ^ is the value of /display/')
    }
}


// ! on entry
// deep links are shown by nav.js instead (no flash of the welcome screen)
if (typeof initial_route === "undefined" || initial_route === "/") cycle(welcome_status)
// cycle(ourFarm)