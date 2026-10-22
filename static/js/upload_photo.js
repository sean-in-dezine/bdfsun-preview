// Photo upload form helpers.
// The form itself lives in index.html (.photoForm); photo_upload() in
// updates_to_javascript.js posts it to /api/upload_flower or /api/upload_insect.

// reCAPTCHA calls this (data-expired-callback) when the token times out.
function expiredRecaptchaCallback() {
  if (window.grecaptcha) grecaptcha.reset()
}

function genForm() {
  // kept for compatibility with takePhoto(); the form is always rendered
}
