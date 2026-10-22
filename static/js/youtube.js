// Click-to-play YouTube: each .yt_facade shows the video's thumbnail and a play
// button; the player (youtube-nocookie.com) is only created when tapped, then plays
// inline. Nothing from YouTube can intercept taps until the visitor asks for it.
(function () {
    document.addEventListener('click', function (ev) {
        var btn = ev.target.closest && ev.target.closest('.yt_facade .yt_play')
        if (!btn) return
        ev.preventDefault()
        var box = btn.parentNode
        var f = document.createElement('iframe')
        f.className = 'youtube_video'
        f.src = 'https://www.youtube-nocookie.com/embed/' + box.dataset.yt + '?autoplay=1&playsinline=1&rel=0'
        f.title = 'YouTube video player'
        f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin')
        f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share')
        f.setAttribute('allowfullscreen', '')
        f.style.border = '0'
        box.replaceWith(f)
        f.focus()
    })
})()
