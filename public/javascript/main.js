(function () {

  $('#text-btn').click(function () {
    $('#text-btn').addClass('disabled');
    test();
  });

  function test () {
    var webhook_url = $('#webhook-url-input').val();
    var consumer_secret = $('#consumer-secret-input').val();

    if (!formValid) {
      return;
    }

    var request = $.ajax({
      url: "/test",
      method: "POST",
      data: {
        webhook_url: webhook_url,
        consumer_secret, consumer_secret
      },
      dataType: "json"
    });
     
    request.done (function (response) {
      console.log(response);

      if (response.errors) {
        showError(response.errors[0]);
      } else {
        showSuccess();
      }
    });
     
    request.fail (function (jqXHR, response) {
      console.log(response);
      showError(response);
    });
  }
  //https://t0fyjc2bvc.execute-api.us-west-1.amazonaws.com/prod/webhooks/twitter
  function formValid () {

    if (!webhook_url.length || !consumer_secret.length) {
      showError('Webhook URL and App Consumer Secret required.');
      return false;
    }

    // if (webhook_url.indexOf('https://') != 0) {
    //   showError('Enter a valid webhook URL using https.');
    //   return false;
    // }

    return true;
  }

  function showSuccess (msg) {
    $('#alert-success').show();
    $('#alert-error').hide();
    $('#text-btn').removeClass('disabled');
  }

  function showError (msg) {
    $('#error-msg').html(msg);
    $('#alert-success').hide();
    $('#alert-error').show();
    $('#text-btn').removeClass('disabled');
  }

})();