$(function(){
    // 첫번째 탭, 페이지 활성화
    $("#total").addClass("active");
    $(".page-section").show();
    // 탭 클릭시 이벤트
    $("#tab #tab-item a").click(function() {
        // 이전 탭 비활성화
        $("#tab #tab-item a").removeClass("active");
        $(this).addClass("active");
        if($(this).text() == "전체") {
            $(".page-section").show();
        } else {
            $(".page-section").hide();
            $($(this).attr("href")).show();
        }
    });

});