$(document).ready(function(){
  $('form').on('submit',function(e) {
    e.preventDefault();
    var url = $('#url').val();
    $('#short-url').text('Loading.......');
    $.post('http://localhost:5000/process?' + $.param({url: url}))
    .done(function(data){
      $('input').val('');
      $('input').focus();
      console.log(data);
      $('#short-url').html('<strong>Short Url: </strong>'+data.short_url);
    })
    .fail(function(xhr, status, err){
      console.log(err);
      $('#short-url').html('<strong>Error: </strong>'+err.error);
    });
  });
});
