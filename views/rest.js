$(document).ready(function(){
  $('form').on('submit',function(e) {
    e.preventDefault();
    var url = $('#url').val();
    $('#short-url').text('Loading.......');
    $.post('https://fcc-url-shortener-63.herokuapp.com/process?' + $.param({url: url}))
    .done(function(data){
      $('input').val('');
      $('input').focus();
      console.log(data);
      $('#short-url').html('<strong>Short Url: </strong><a target="_blank" href='+data.short_url+'>'+data.short_url+'</a>');
    })
    .fail(function(xhr, status, err){
      console.log(err);
      $('#short-url').html('<strong>Error: </strong>Please provide valid url like http://example.com');
    });
  });
});
