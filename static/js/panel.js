// Pull-up "More about the farm" panel (templates/partials/farm_panel.html).
// Opens from the strip above the bottom bar (tap, Enter/Space, or swipe up) and
// closes with Back, swipe down, the X, the backdrop or Escape. nav.js gives the open
// panel its own history entry (like a lightbox), so Back / iOS swipe-back close it.
(function () {
    var strip = document.querySelector('.fp_strip')
    var sheet = document.querySelector('.fp_sheet')
    var backdrop = document.querySelector('.fp_backdrop')
    if (!strip || !sheet) return
    var head = sheet.querySelector('.fp_head')
    var body = sheet.querySelector('.fp_body')
    var closeBtn = sheet.querySelector('.fp_close')
    var scroller = document.querySelector('.static_and_immovable')
    var syncNav = function () { if (window.bdfNav) window.bdfNav.sync() }

    function isOpen() { return sheet.classList.contains('is-open') }

    function open() {
        if (isOpen()) return
        backdrop.hidden = false
        sheet.removeAttribute('inert')
        sheet.setAttribute('aria-hidden', 'false')
        strip.setAttribute('aria-expanded', 'true')
        if (scroller) scroller.setAttribute('inert', '')
        void sheet.offsetWidth                 // let the closed position apply before animating
        sheet.classList.add('is-open')
        backdrop.classList.add('is-open')
        body.scrollTop = 0
        setTimeout(function () { closeBtn.focus({ preventScroll: true }) }, 50)
    }

    // the X's own click is what nav.js sees; everything else goes through close()
    function close(focusStrip) {
        if (!isOpen()) return
        sheet.classList.remove('is-open')
        backdrop.classList.remove('is-open')
        sheet.style.transform = ''
        sheet.setAttribute('inert', '')
        sheet.setAttribute('aria-hidden', 'true')
        strip.setAttribute('aria-expanded', 'false')
        if (scroller) scroller.removeAttribute('inert')
        setTimeout(function () { if (!isOpen()) backdrop.hidden = true }, 300)
        if (focusStrip) strip.focus({ preventScroll: true })
    }

    strip.addEventListener('click', open)
    closeBtn.addEventListener('click', function () { close(true) })
    backdrop.addEventListener('click', function () { close(true) })
    // links in the panel (app screens or other sites) close it on the way out
    sheet.addEventListener('click', function (ev) {
        if (ev.target.closest && ev.target.closest('a[href]')) close(false)
    })
    document.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape' && isOpen()) { close(true); syncNav() }
    })

    // ---- swipe up on the strip opens -------------------------------------
    var sy = null
    strip.addEventListener('touchstart', function (ev) { sy = ev.touches[0].clientY }, { passive: true })
    strip.addEventListener('touchmove', function (ev) {
        if (sy !== null && sy - ev.touches[0].clientY > 24) { sy = null; open(); syncNav() }
    }, { passive: true })
    strip.addEventListener('touchend', function () { sy = null }, { passive: true })

    // ---- swipe down on the sheet (from its header, or from the top of its content) closes
    var dy0 = null, dragging = false
    function startDrag(ev) {
        if (!isOpen()) return
        if (ev.currentTarget === body && body.scrollTop > 0) return
        dy0 = ev.touches[0].clientY; dragging = false
    }
    function moveDrag(ev) {
        if (dy0 === null) return
        var d = ev.touches[0].clientY - dy0
        if (d <= 0) { if (dragging) sheet.style.transform = ''; return }
        if (!dragging && d < 8) return
        dragging = true
        sheet.classList.add('is-dragging')
        var desk = window.matchMedia('(min-width: 769px)').matches
        sheet.style.transform = desk ? 'translate(-50%, ' + d + 'px)' : 'translateY(' + d + 'px)'
        if (ev.cancelable) ev.preventDefault()
    }
    function endDrag(ev) {
        if (dy0 === null) return
        var d = (ev.changedTouches[0] || {}).clientY - dy0
        dy0 = null
        sheet.classList.remove('is-dragging')
        if (dragging && d > 80) { close(true); syncNav() }
        else sheet.style.transform = ''
        dragging = false
    }
    ;[head, body].forEach(function (el) {
        el.addEventListener('touchstart', startDrag, { passive: true })
        el.addEventListener('touchmove', moveDrag, { passive: false })
        el.addEventListener('touchend', endDrag, { passive: true })
        el.addEventListener('touchcancel', endDrag, { passive: true })
    })

    window.bdfPanel = { open: open, close: close, isOpen: isOpen }
})()
