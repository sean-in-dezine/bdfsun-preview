// sunflower festival
let SUNFLOWER_FESTIVAL = document.querySelector('div.tile_sf')
SUNFLOWER_FESTIVAL.addEventListener('click', sunflowerFestival)

function hideChildren() {
    for (const ch_child of CHANGEABLE_CHILDREN) {
        ch_child.style.display = 'none'
    }
}

function sunflowerFestival() {
    display = "sunflowerFestival"
    //console.log(display)
    displayBackButton(display)

    let sunflower_screen = document.querySelector('.sunflower_festival')
    hideChildren()
    hideMaps()
    sunflower_screen.style.display = 'grid'
    changeShopSticky("View Events")

    // !shop camera
    shop_camera.style.display = 'none'

    // ! margin set to none
    document.querySelector('.sunflower_shop').style.marginTop = '0'
}
// our farm
let OUR_FARM = document.querySelector('div.tile_of')
OUR_FARM.addEventListener('click', ourFarm)


function ourFarm() {
    display = "ourFarm"
    displayBackButton(display)
    //console.log(display)
    let our_farm_screen = document.querySelector('.our_farm')
    hideChildren()
    our_farm_screen.style.display = 'grid'
    changeShopSticky("Sunflower Shop")
    // !shop camera
    shop_camera.style.display = 'none'

    // ! margin set to none
    document.querySelector('.sunflower_shop').style.marginTop = '0'
}


// insect
let INSECT = document.querySelector('div.tile_in')
INSECT.addEventListener('click', insects)


function insects() {
    display = "insects"
    //console.log(display)
    displayBackButton(display)

    let insect_screen = document.querySelector('.insects')
    hideChildren()

    insect_screen.style.display = 'grid'
    changeShopSticky("Take a Picture - Insect")
    // !shop camera
    shop_camera.style.display = 'grid'

    // ! margin set to none
    document.querySelector('.sunflower_shop').style.marginTop = '1.5vh'

}


// education
let EDUCATION = document.querySelector('div.tile_ed')
EDUCATION.addEventListener('click', education)


function education() {
    display = "education"
    //console.log(display)
    displayBackButton(display)

    let education_screen = document.querySelector('.education')
    hideChildren()
    education_screen.style.display = 'grid'
    changeShopSticky("Take a Picture - Flower")
    setEduImg()
    // !shop camera
    shop_camera.style.display = 'grid'

    // ! margin set to none
    document.querySelector('.sunflower_shop').style.marginTop = '1.5vh'

}