// current screen; read by back() and the screen switchers
var display = "default"
let welcome_status = "default"
let WELCOME_SCREEN = document.querySelector('.welcome_screen')
let CHANGEABLE_CHILDREN = document.querySelectorAll('.changeable_content > div')



// !this might break app
let sunflower_bar_event = document.querySelector('.sunflower_logo_bar')
sunflower_bar_event.addEventListener('click', dontDoAnything)

function dontDoAnything(ev) {
    ev.preventDefault()
}
// !this might break app


let shop_camera = document.querySelector('.shop_camera')




function changeShopSticky(textOption) {
    let sunflower_shop = document.querySelector('.sunflower_shop')
    sunflower_shop.innerText = textOption

}

function welcome() {

    for (const ch_child of CHANGEABLE_CHILDREN) {

        ch_child.style.display = 'none'
    }

    WELCOME_SCREEN.style.display = 'grid'
    changeShopSticky("Sunflower Shop")

    // !shop camera
    shop_camera.style.display = 'none'

    // ! margin set to none
    document.querySelector('.sunflower_shop').style.marginTop = '0'


}

// create 4 event listeners