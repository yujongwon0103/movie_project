$(function(){
    // 페이지 섹션 숨기기
    $(".page-section").hide();
    // 첫번째 탭, 페이지 활성화
    $("#detail").addClass("active").show();
    $(".page-section:first").show();
    // 탭 클릭시 이벤트
    $("#tab .nav-item a").click(function() {
        $(".carousel-item.active #video").get(0).pause();
        // 이전 탭 비활성화
        $("#tab .nav-item a").removeClass("active");
        $(".page-section").hide();
        $(this).addClass("active");
        let activeTab = $(this).attr("id");
        $("#"+activeTab+"_page").show();
    });

    $('#tab2 #tab2-section #tab2-article').each(function(idx, val){
        // 카드 리스트 안보이게하기
        let less_btn = $(val).prev().find('a');
        less_btn.on("click", function() {
            if(less_btn.hasClass("active")) {
                $(val).css("display", "block");
                less_btn.removeClass("active");
            } else {
                $(val).css("display", "none");
                less_btn.addClass("active");
            }
        });
    });
    $('#tab2 #tab2-section #tab2-article #people-list').each(function(idx, val) {
        // 리스트 최대 5개만 노출
        let card_list = $(val).children();
        card_list.hide();
        card_list.slice(0, 5).css("display", "block");
        // 아이템이 5개 이하이면 버튼 안보이게
        let more_btn = $(val).next().find('a');
        if(card_list.length <= 5) more_btn.css("display", "none");
        more_btn.click(function(e){
            e.preventDefault();
            let hidden_card = $(val).find(".card:hidden");
            hidden_card.slice(0, 5).fadeIn(200).css('display', 'block'); // 클릭시 more 갯수 지저정
            if(hidden_card.length <= 5){ // 컨텐츠 남아있는지 확인
                more_btn.fadeOut(100); // 컨텐츠 없을 시 버튼 사라짐
            }
        });
    });

    let src = $('.carousel-inner .carousel-item:first video source').attr('src');
    if(src == "") {
        $('.page-section').remove('#tab3');
        $('.nav-item').remove('#tab-vod');
    } else {
        let btn = $("#slider-indicators").children("button:first");
        btn.addClass("active");
        btn.attr("aria-current", "true");

        let div = $("#slider-inner").children("div:first");
        div.addClass("active");

        $(".carousel-control-prev").on('click', function() {
            $(".carousel-item.active #video").get(0).pause();
        });
        $(".carousel-control-next").on('click', function() {
            $(".carousel-item.active #video").get(0).pause();
        });
        $(".carousel-indicators button").on('click', function() {
            $(".carousel-item.active #video").get(0).pause();
        });
    }

    let title = $('.title_kor').text();
    let poster_length = $('#poster_list').children().length;
    let stll_length = $('#stll_list').children().length;
    if(poster_length == 0 && stll_length == 0) {
        $('.page-section').remove('#tab4');
        $('.nav-item').remove('#tab-photo');
    } else {
        if(poster_length == 0) {
            $('.container').remove("#poster_section");
        } if(stll_length == 0) {
            $('.container').remove("#stll_section");
        }
        $('#poster_length').text(poster_length);
        $('#stll_length').text(stll_length);
        let init_modal = function(tag) {
            let idx = tag.index();
            let len = $('#length').text();
            // 이미지 인덱스 설정
            $('#index').text(idx+1);
            // 이전 이미지 버튼 설정
            $('.btn-prev').on('click', function(){
                init_modal(tag.prev());
            });
            // 이미지 소스 설정
            $('#view_img').attr("src", tag.attr('src'));
            // 다음 이미지 버튼 설정
            $('.btn-next').on('click', function(){
                init_modal(tag.next());
            });
            if(idx == 0) {
                $('.btn-prev').hide();
                $('.btn-next').show();
            }
            else if(idx == len-1) {
                $('.btn-prev').show();
                $('.btn-next').hide();
            }
            else {
                $('.btn-prev').show();
                $('.btn-next').show();
            }
            //$('.modal-body').zoomer();
        };
        $('.photo').on('click', function(){
            let parent = $(this).parent();
            $('#length').text(parent.children().length);
            let type = parent.parent().find('h2 .type').text();
            $('#modal_title').text(title+" - "+type);
            init_modal($(this));
            $('#img_view_modal').modal('show');
        });
        $('.btn-block').on('click', function(){
            $('#img_view_modal').modal('hide');
        });
    }
});