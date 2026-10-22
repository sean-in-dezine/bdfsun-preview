// Keyboard and mouse support for the sliders, galleries and lightboxes.
// The click handlers live in the other scripts; this only makes the
// clickable <div>/<img> controls focusable and maps keys onto them:
//   Enter / Space  activate the focused control
//   Left / Right   previous / next in the open lightbox, else the visible slider
//   Escape         close the open lightbox
// It adds no styles, so the mobile rendering is unchanged.
(function () {
    const CONTROLS = [
        ['.tile_sf', 'Sunflower Festival'], ['.tile_of', 'Our Farm'],
        ['.tile_in', 'Insects'], ['.tile_ed', 'Education'],
        ['.daBackButton', 'Back'],
        ['.wend_left_arrow > img', 'Previous photo'], ['.wend_right_arrow > img', 'Next photo'],
        ['#ed_slider_left', 'Previous photo'], ['#ed_slider_right', 'Next photo'],
        ['.os_left', 'Previous photos'], ['.os_right', 'Next photos'],
        ['.os_cycle_left', 'Previous photo'], ['.os_cycle_right', 'Next photo'],
        ['.vs_cycle_left', 'Previous photo'], ['.vs_cycle_right', 'Next photo'],
        ['.exit_os_cycle', 'Close photo'], ['.exit_vs_cycle', 'Close photo'],
        ['.inner_circle', 'Show more photos'],
        ['.os_gallery', 'Enlarge photo'], ['.vs_gallery > img', 'Enlarge photo'],
    ]

    for (const [selector, label] of CONTROLS) {
        for (const el of document.querySelectorAll(selector)) {
            if (!el.hasAttribute('role')) el.setAttribute('role', 'button')
            if (!el.hasAttribute('tabindex')) el.tabIndex = 0
            if (!el.getAttribute('aria-label') && !(el.alt || '').trim()) el.setAttribute('aria-label', label)
        }
    }

    const isShown = (el) => !!el && el.getClientRects().length > 0 &&
        getComputedStyle(el).visibility !== 'hidden'
    const $ = (s) => document.querySelector(s)

    // [container that must be visible, previous, next, close]
    const LIGHTBOXES = [
        ['.os_gallery_lightbox', '.os_cycle_left', '.os_cycle_right', '.exit_os_cycle'],
        ['.vs_spec_img', '.vs_cycle_left', '.vs_cycle_right', '.exit_vs_cycle'],
    ]
    const SLIDERS = [
        ['.weekend', '.wend_left_arrow > img', '.wend_right_arrow > img'],
        ['.education', '#ed_slider_left', '#ed_slider_right'],
        ['.story', '.os_left', '.os_right'],
    ]

    document.addEventListener('keydown', function (ev) {
        if (ev.defaultPrevented || ev.altKey || ev.ctrlKey || ev.metaKey) return
        const t = ev.target
        if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT|IFRAME)$/.test(t.tagName))) return

        // Enter / Space on a focusable non-button control
        if ((ev.key === 'Enter' || ev.key === ' ') && t && t.getAttribute &&
            t.getAttribute('role') === 'button' && t.tagName !== 'BUTTON') {
            ev.preventDefault()
            t.click()
            return
        }

        const box = LIGHTBOXES.find(([c]) => isShown($(c)))
        if (box) {
            const [, prev, next, close] = box
            if (ev.key === 'Escape') { ev.preventDefault(); $(close).click(); return }
            if (ev.key === 'ArrowLeft') { ev.preventDefault(); $(prev).click(); return }
            if (ev.key === 'ArrowRight') { ev.preventDefault(); $(next).click(); return }
            return
        }

        if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return
        const slider = SLIDERS.find(([c]) => isShown($(c)))
        if (!slider) return
        ev.preventDefault()
        $(ev.key === 'ArrowLeft' ? slider[1] : slider[2]).click()
    })
})()
