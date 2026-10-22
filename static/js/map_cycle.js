let map_initial = document.querySelector('.map_initial')
let map_set_2 = document.querySelector('.map_set_2')
let map_set_3 = document.querySelector('.map_set_3')
let map_set_4 = document.querySelector('.map_set_4')


let map_on

function hideMaps() {
    map_on = 1
    map_initial.style.display = 'grid'
    map_set_2.style.display = 'none'
    map_set_3.style.display = 'none'
    map_set_4.style.display = 'none'
}

let next_map = document.querySelector('.next_map')
let next_map_2 = document.querySelector('.next_map_2')
let next_map_3 = document.querySelector('.next_map_3')
let next_map_4 = document.querySelector('.next_map_4')
next_map.addEventListener('click', nextMap)
next_map_2.addEventListener('click', nextMap)
next_map_3.addEventListener('click', nextMap)
next_map_4.addEventListener('click', nextMap)

function nextMap(ev) {

    ev.preventDefault()
    if (map_on == 4) {
        hideMaps()
    } else if (map_on == 1) {
        map_on = 2
        map_initial.style.display = 'none'
        map_set_2.style.display = 'grid'
    } else if (map_on == 2) {
        map_on = 3
        map_set_2.style.display = 'none'
        map_set_3.style.display = 'grid'
    } else if (map_on == 3) {
        map_on = 4
        map_set_3.style.display = 'none'
        map_set_4.style.display = 'grid'
    }

}