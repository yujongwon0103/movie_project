$(function(){
    $(document).ready(function() {
        // 일별 박스오피스
        let type = $('.tit_section').text();
        // 20240108~20240108
        let date = $('.boxoffice_date').text();
        let startDate = date.substring(0,8);
        let startY = Number(startDate.substring(0,4));
        let startM = Number(startDate.substring(4,6));
        let startD = Number(startDate.substring(6,8));
        let endDate = date.substring(9,17);
        let endY = Number(endDate.substring(0,4));
        let endM = Number(endDate.substring(4,6));
        let endD = Number(endDate.substring(6,8));

        let dateToStr = function(date) {
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            if(m < 10) m = "0" + m;
            let d = date.getDate();
            if(d < 10) d = "0" + d;
            return y+m+d;
        };
        let recentDate = function() {
            let today = new Date();
            return dateToStr(new Date(today.setDate(today.getDate() - 1)));
        };
        let recentWeek = function() {
            let today = new Date();
            let date = today.getDate();
            let day = today.getDay();
            if(day == 0) return dateToStr(new Date(today.setDate(date - 7)));
            else return dateToStr(new Date(today.setDate(date - day)));
        };
        let calcMonth = function(y, m) {
            switch(m) {
                case 1,3,5,7,8,10,12:
                    return 31;
                case 4,6,9,11:
                    return 30;
                default:
                    if(((y % 4) == 0 && (y % 100) != 0) || (y % 400) == 0) return 29;
                    else return 28;
            }
        }
        let prevDate = function(y, m, d) {
            if(d > 1) return y*10000 + m*100 + d-1;
            else {
                if(m > 1) return y*10000 + (m-1)*100 + calcMonth(y,m);
                else return (y-1)*10000 + 1231;
            }
        };
        let nextDate = function(y, m, d) {
            if(d < calcMonth(y,m)) return y*10000 + m*100 + d+1;
            else {
                if(m < 12) return y*10000 + (m+1)*100 + 1;
                else return (y+1)*10000 + 101;
            }
        };
        $('#prev_date').on('click', function() {
            if(type == "일별 박스오피스") location.href = "/boxoffice/daily?date="+prevDate(startY,startM,startD);
            else location.href = "/boxoffice/weekly?date="+prevDate(startY,startM,startD);
        });
        if(type == "일별 박스오피스") {
            if(endDate == recentDate()) $('#next_date').hide();
            else $('#next_date').show();
        } else {
            if(endDate == recentWeek()) $('#next_date').hide();
            else $('#next_date').show();
        }
        $('#next_date').on({
            click:function() {
                if(type == "일별 박스오피스") location.href = "/boxoffice/daily?date="+nextDate(endY,endM,endD);
                else location.href = "/boxoffice/weekly?date="+nextDate(endY,endM,endD);
            }
        });
        if(type == "일별 박스오피스") {
            if($("#weekly").hasClass("active")) {
                $('#weekly').removeClass("active");
            }
            $('#daily').addClass("active");
        } else {
            if($("#daily").hasClass("active")) {
                $('#daily').removeClass("active");
            }
            $('#weekly').addClass("active");
        }
        $('#daily').on('click', function() {
            location.href = "/boxoffice/daily?date="+recentDate();
        });
        $('#weekly').on('click', function() {
            location.href = "/boxoffice/weekly?date="+recentWeek();
        });
        $('#calendar').datepicker({
            dateFormat: 'yymmdd',
            prevText: '이전 달',
            nextText: '다음 달',
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            showMonthAfterYear: true,
            yearSuffix: '년',
            maxDate : -1,
            onSelect : function(dateString) {
                if(type == "일별 박스오피스") location.href = "/boxoffice/daily?date="+dateString;
                else location.href = "/boxoffice/weekly?date="+dateString;
            }
        });
        let map = {
            "전체" : "rgb(60,179,113,0.95)",
            "12" : "rgb(75,137,220,0.95)",
            "15" : "rgb(246,187,67,0.95)",
            "18" : "rgb(219,68,85,0.95)"
        };
        $('.row .col .card').each(function(idx,val) {
            // 영화 기본키
            let movieCd = $(val).find('#movieCd').val();
            // 포스터
            let poster = $(val).find('.card-img-top');
            if(poster.attr("src") == "" || poster.attr("src") == undefined || poster.attr("src") == null) {
                poster.attr('src', '/img/no_image.png');
            }
            // 관람 등급
            let circle = $(val).find('.card-img-overlay .rating_circle');
            let rating = circle.find('span:first').text();
            if(rating in map) {
                circle.show();
                circle.css({'background-color':map[rating]});
            } else {
                circle.hide();
            }
            // 영화 제목
            let cardBody = $(val).find('.card-body');
            let cardImg = $(val).find('#card-img');
            let movie_name = cardBody.find('#movie_name');
            if(movieCd == "") {
                cardImg.removeAttr("href");
                movie_name.removeAttr("href");
            } else {
                cardImg.on('click', function() {
                    location.href = "/detail/movie/"+movieCd;
                });
                movie_name.on('click', function() {
                    location.href = "/detail/movie/"+movieCd;
                });
            }
            if(movie_name.text().length > 12) {
                movie_name.text(movie_name.text().substring(0,12) + "...");
            }
            // 개봉일
            let openDt = cardBody.find('.open_date');
            let openDtTxt = openDt.text();
            let a = openDtTxt.substring(0,4);
            let b = openDtTxt.substring(4,6);
            let c = openDtTxt.substring(6,8);
            openDt.text("개봉 "+a+"."+b+"."+c);
        });
        $.tablesorter.addParser({
            id:'parser',
            is:function(s) {
                return false;
            },
            format:function(s) {
                return s.slice(0,-1).replace(/,/g, '');
            },
            type:'numeric'
        });
        $("table").tablesorter();
        $('table tbody tr').each(function(idx,val) {
            let td = $(val).find('#movie_name');
            let txt = td.text();
            if(txt.length > 12) td.text(txt.substring(0,12) + "...");
        });

    });
});