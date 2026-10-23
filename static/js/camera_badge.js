// Bottom-bar camera badge (Take a Picture screens only).
// The badge is a real <input type="file" capture>, so one tap opens the camera.
// After a photo is taken, open this screen's photo form exactly as the
// "Take a Picture" button does, with the photo already in the form's photo field.
(function () {
  var badgeInput = document.getElementById('cameraBadgeInput')
  var formInput = document.getElementById('takePhotoButton')
  var circle = formInput && formInput.closest('.hide_replacement')
  var shopButton = document.querySelector('div>button.sunflower_shop')
  if (!badgeInput || !formInput || !shopButton) return

  var previewUrl = null
  function showPreview(file) {
    if (!circle) return
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    previewUrl = null
    if (file && /^image\//.test(file.type)) {
      previewUrl = URL.createObjectURL(file)
      circle.style.backgroundImage = 'url("' + previewUrl + '")'
      circle.classList.add('has-photo')
    } else {
      circle.style.backgroundImage = ''
      circle.classList.remove('has-photo')
    }
  }
  // the form's own field (library or camera) gets the same thumbnail
  formInput.addEventListener('change', function () {
    badgeFile = null
    showPreview(formInput.files[0])
  })

  // fallback for browsers without a DataTransfer constructor: photo_upload() reads this
  var badgeFile = null
  window.bdfBadgePhoto = function () { return badgeFile }

  badgeInput.addEventListener('change', function () {
    var file = badgeInput.files && badgeInput.files[0]
    if (!file) return                        // camera cancelled: stay where we are
    var text = shopButton.innerHTML
    if (text !== 'Take a Picture - Flower' && text !== 'Take a Picture - Insect') return
    if (typeof display === 'undefined' || display !== 'photoForm') shopButton.click()  // same flow as the button (history entry, title)

    var attached = false
    try {
      var dt = new DataTransfer()
      dt.items.add(file)
      formInput.files = dt.files
      attached = formInput.files.length === 1
    } catch (e) { attached = false }
    badgeFile = attached ? null : file
    showPreview(file)
    if (attached) badgeInput.value = ''      // lets the same photo be picked again later
  })
})()
