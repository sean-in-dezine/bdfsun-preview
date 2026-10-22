// Phone app shell (see the "app shell" section of css/mobile.css).
// On phones the document does not scroll; .static_and_immovable does. The
// original scripts scroll with window.scrollTo / window.pageYOffset and listen
// for document scroll events, so those are pointed at the inner scroller while
// the phone layout is active. On wider screens everything is left as it was.
(function () {
    const scroller = document.querySelector('.static_and_immovable')
    if (!scroller) return
    const mq = window.matchMedia('(max-width: 768px)')
    const active = () => mq.matches
    window.bdfScroller = scroller

    const winScrollTo = window.scrollTo.bind(window)
    const winScrollBy = window.scrollBy.bind(window)
    window.scrollTo = function (x, y) {
        if (!active()) return winScrollTo.apply(null, arguments)
        if (typeof x === 'object' && x) return scroller.scrollTo(x)
        scroller.scrollTo(x || 0, y || 0)
    }
    window.scroll = window.scrollTo
    window.scrollBy = function (x, y) {
        if (!active()) return winScrollBy.apply(null, arguments)
        if (typeof x === 'object' && x) return scroller.scrollBy(x)
        scroller.scrollBy(x || 0, y || 0)
    }
    for (const prop of ['pageYOffset', 'scrollY']) {
        const desc = Object.getOwnPropertyDescriptor(window, prop) ||
            Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window), prop)
        const orig = desc && desc.get ? desc.get : null
        try {
            Object.defineProperty(window, prop, {
                configurable: true,
                get() { return active() ? scroller.scrollTop : (orig ? orig.call(window) : 0) },
            })
        } catch (e) { /* leave the native value */ }
    }
    // scroll events on an element don't reach document; re-announce them there
    scroller.addEventListener('scroll', function () {
        if (active()) document.dispatchEvent(new Event('scroll'))
    }, { passive: true })
    // the browser can no longer restore window scroll; screens reset to the top anyway
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
})()
