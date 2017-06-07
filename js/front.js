jQuery(document).ready(function() {
  jQuery.timeago.settings.allowFuture = true;
  echo.init({
    offset: 640,
    throttle: 250,
    unload: false
  });
});