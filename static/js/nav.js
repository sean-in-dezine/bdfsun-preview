// History support: every screen gets its own URL, and the browser's Back
// (including the iOS edge swipe) does exactly what the top back button does,
// down to the home screen; from home, Back leaves the site as usual.
//
// The existing screen functions still do all the showing and hiding. This file:
//  - pushes one history entry when a click opens a different screen (never duplicates),
//  - makes the top back button call history.back() so both paths share one popstate handler,
//  - seeds history on a deep-link load (/festival -> [/ , /festival]) so Back goes home first,
//  - gives open lightboxes their own entry, so Back closes them instead of changing screen.
(function () {
    var BASE = (window.app_base || '/').replace(/\/+$/, '')        // '' in production
    var ROUTES = [
        ["/", []],
        ["/festival", ["sunflowerFestival"]],
        ["/weekend-activities", ["sunflowerFestival", "weekend"]],
        ["/weekday-activities", ["sunflowerFestival", "weekday"]],
        ["/community-involvement", ["sunflowerFestival", "community"]],
        ["/our-farm", ["ourFarm"]],
        ["/our-story", ["ourFarm", "story"]],
        ["/vision", ["ourFarm", "vision"]],
        ["/partners", ["ourFarm", "partner"]],
        ["/insects", ["insects"]],
        ["/insects/asian-lady-beetle", ["insects", "io_asian"]],
        ["/insects/bumblebee", ["insects", "io_bumblebee"]],
        ["/insects/cabbage-white-butterfly", ["insects", "io_cabbage"]],
        ["/insects/corn-earworm-moth-caterpillar", ["insects", "io_corn"]],
        ["/insects/differential-grasshopper", ["insects", "io_differential"]],
        ["/insects/fall-webworm-moth-caterpillar", ["insects", "io_fall"]],
        ["/insects/goldenrod-soldier-beetle", ["insects", "io_goldenrod"]],
        ["/insects/hawaiian-beet-webworm-moth", ["insects", "io_hawaiian"]],
        ["/insects/monarch-butterfly", ["insects", "io_monarch"]],
        ["/insects/pipevine-swallowtail", ["insects", "io_pipevine"]],
        ["/insects/seven-spotted-lady-beetle", ["insects", "io_seven"]],
        ["/insects/western-honey-bee", ["insects", "io_western"]],
        ["/education", ["education"]],
        ["/education/sunflower-anatomy", ["education", "ed_anatomy"]],
        ["/education/bloom-cycle-and-planting", ["education", "ed_bloom"]],
        ["/education/choosing-a-planting-site", ["education", "ed_choosing"]],
        ["/education/planting-sunflower-seeds", ["education", "ed_planting"]],
        ["/education/caring-for-sunflowers", ["education", "ed_caring"]],
        ["/education/pests-and-disease", ["education", "ed_pests"]],
        ["/education/cutting-sunflowers-for-bouquets", ["education", "ed_cutting"]],
        ["/education/harvesting-sunflowers", ["education", "ed_harvesting"]],
        ["/education/sunflower-varieties", ["education", "ed_sunflower"]]
    ]
    var chainOf = {}, pathOf = { 'default': '/' }
    ROUTES.forEach(function (r) {
        chainOf[r[0]] = r[1]
        if (r[1].length) pathOf[r[1][r[1].length - 1]] = r[0]
    })
    var fakeEvent = { preventDefault: function () {} }
    // [lightbox that must be visible, its close control]
    var OVERLAYS = [['.os_gallery_lightbox', '.exit_os_cycle'], ['.vs_spec_img', '.exit_vs_cycle']]
    var ignorePops = 0          // popstates we caused ourselves
    var restoring = false

    function appPath() {
        var p = decodeURI(location.pathname)
        if (BASE && p.indexOf(BASE) === 0) p = p.slice(BASE.length)
        p = p.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/+$/, '').toLowerCase()
        return p || '/'
    }
    function url(path) { return BASE + path }
    function isShown(sel) {
        var el = document.querySelector(sel)
        return !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden'
    }
    function openOverlay() {
        for (var i = 0; i < OVERLAYS.length; i++) if (isShown(OVERLAYS[i][0])) return OVERLAYS[i]
        return null
    }

    // Show a screen by replaying the clicks a visitor would make.
    function show(path) {
        restoring = true
        try {
            window.scrollTo(0, 0)
            if (path === '/') {
                welcome()
                display = 'default'
                hideBackButton('default')
            } else {
                (chainOf[path] || []).forEach(function (fn) { if (typeof window[fn] === 'function') window[fn](fakeEvent) })
            }
            if (typeof updateWelcomeTopHeader === 'function') updateWelcomeTopHeader()
        } finally {
            restoring = false
        }
        if (window.bdfOnNavigate) window.bdfOnNavigate(path)
    }

    function state() { return history.state && history.state.bdf ? history.state : null }

    // ---- initial load ------------------------------------------------------
    var start = chainOf[appPath()] ? appPath() : null
    if (start && start !== '/') {
        // Deep link: seed home and each parent screen beneath it, so Back walks up to home, then out.
        var chain = chainOf[start], depth = 0
        history.replaceState({ bdf: 1, path: '/', depth: 0 }, '', url('/'))
        for (var i = 0; i < chain.length - 1; i++) {
            var parent = pathOf[chain[i]]
            history.pushState({ bdf: 1, path: parent, depth: ++depth }, '', url(parent))
        }
        history.pushState({ bdf: 1, path: start, depth: ++depth }, '', url(start))
        show(start)
    } else {
        // Home, or an unknown path (the server's 404 shows the home screen): keep the URL.
        history.replaceState({ bdf: 1, path: '/', depth: 0 }, '', location.href)
    }

    // ---- the top back button goes through history ---------------------------
    document.addEventListener('click', function (ev) {
        if (!ev.target.closest || !ev.target.closest('.daBackButton')) return
        var s = state()
        if (s && s.depth > 0) {
            ev.stopPropagation()        // main.js back() is not needed; popstate shows the screen
            ev.preventDefault()
            history.back()
        }
    }, true)

    // ---- after any click: did the screen change, or a lightbox open/close? ----
    document.addEventListener('click', function () {
        if (restoring) return
        var s = state() || { path: '/', depth: 0 }
        var ov = openOverlay()
        if (ov && !s.overlay) {
            history.pushState({ bdf: 1, path: s.path, depth: s.depth + 1, overlay: 1 }, '', location.href)
            return
        }
        if (!ov && s.overlay) {
            // closed with its own X / Escape: drop the overlay entry
            ignorePops++
            history.back()
            return
        }
        var path = display === 'photoForm' ? null : pathOf[display]
        if (display === 'photoForm' && s.form !== 1) {
            // the photo form has no URL of its own, but Back should still leave it
            history.pushState({ bdf: 1, path: s.path, depth: s.depth + 1, form: 1 }, '', location.href)
            return
        }
        if (!path || path === s.path) return
        history.pushState({ bdf: 1, path: path, depth: s.depth + 1 }, '', url(path))
    })

    window.addEventListener('popstate', function () {
        if (ignorePops) { ignorePops--; return }
        var ov = openOverlay()
        if (ov) {
            // Back with a lightbox open closes it and stays on the screen
            var close = document.querySelector(ov[1])
            restoring = true
            try { if (close) close.click() } finally { restoring = false }
            return
        }
        var s = state()
        show(s ? s.path : (chainOf[appPath()] ? appPath() : '/'))
    })

    window.bdfNav = { show: show, pathOf: pathOf, chainOf: chainOf, url: url }
})()
