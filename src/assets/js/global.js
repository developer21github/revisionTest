var showError, showSuccess;
(function() {
    showError = function(message) {
      if (!message) {
        message = 'An error has occurred. Please try again!';
      }
      $.notify({
        title: "<b>Error</b>",
        message: message
      },{
        type: 'danger',
        allow_dismiss: true
      });
    },
    showSuccess = function(message) {
      $.notify({
        title: "<b>SUCCESS</b>",
        message: message
      },{
        type: 'success',
        allow_dismiss: true
      });
    }

})();
