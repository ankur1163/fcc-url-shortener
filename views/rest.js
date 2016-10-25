$(document).ready(function(){
  $('form').on('submit',function(e) {
    e.preventDefault();
    var url = $('#url').val();
    $('#short-url').text('Loading.......');
    $.post('http://localhost:5000/process?' + $.param({url: url}), function(data) {
      $('input').val('');
      $('input').focus();
      console.log(data);
      $('#short-url').html('<strong>Short Url: </strong>'+data.short_url);
    });
  });
});
