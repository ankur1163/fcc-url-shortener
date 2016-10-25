$('form').submit(function(event) {
    event.preventDefault();
    var url = $('#url').val();

    $.post('http://localhost:5000/process?' + $.param({url: url}), function() {
      $('input').val('');
      $('input').focus();
    });
  });
