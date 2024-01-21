$(function(){
    $('#btn-main').on('click', function() {
        location.href="/boxoffice";
    });
    $('#button-search').on('click', function() {
        location.href="/search/result?keyword="+$('#keyword').val();
    });
    $("#keyword").on("keyup", function(key) {
        if(key.keyCode==13) location.href="/search/result?keyword="+$('#keyword').val();
    });
});