$(function(){
    //인풋에 키누름(keypess) 이벤트 정의
    $(".input_A > input[type='text']").keypress(function(event){
        // console.log(event.keyCode); 로 f12해본후에 key나keyCode찾기 어떤걸 눌러서 이벤트할지
        //console.log($(this).val().length); 아무것도 안눌렸을때 뭐가 나오는지 확인 하는법
        //조건문 if절에서 &&>조건추가할때 사용 != >같지 않을때 표시법
        //엔터키코드(13)일경우와 인풋에 값이 있을때 실행돠는 조건문
        if(event.keyCode == 13 && $(this).val().length !=0){
            var _val =  $(this).val();//입력중인 값을 담는 변수
            var _time; //입력되는 순간의 시간을 담는 변수
            var _class = $(this).attr("class");

            //현재 시간 구하기
            var _date = new Date(); //Date갹채(pc의 전체시간정보)
            var _hh = _date.getHours() //Date 객체에서 시간을 구함
            var _mm = _date.getMinutes() //Date 객체에서 분을 구함
            var _apm = "오전"; //오전오후 구분 변수
            if(_hh>12){ //만약 시간이 12이상일 경우
                _apm= "오후"; //오후로 변경
                _hh-=12; //> _hh=_hh=12; //시간은 24 > 12시간 표현으로 변경
            }
            _time =_apm+" "+_hh+":"+_mm;

            //말풍선 태그를 append로 동적 추가
            $(".chat_A").append('<div class="item '+_class+'"><div class="box"><p class="msg">'+_val+'</p><span class="time">'+_time+'</span></div></div>')
            setTimeout(function(){//setTimeout으로 0.1 초후 호출시킴 (시간차발생)
                $(".chat_A .item").addClass("on");//item에 on클래스 추가 (애니메이션 발생 시키는 트리거)
            },10)
            
            //입력후 입력된 인풋의 값을 지워줌(초기화)
             $(this).val("");

             //채팅창 맨 밑으로 갈 수 있게 하는 스크롤 이벤트
            //  var _itemL = $(".chat_A.item").length;//말풍선(item)의 갯수
             var _itemH = 0; // 말풍선(item)들의 각 높이를 더해줄 변수

             //each라는 또다른 반복문 제이쿼리선택자의 길이만큼 반복시킴
             $(".chat_A.item").each(function(idx){
                 //this(말풍선) 길이를 _item에 누적 추가 + margin top값 15ox
                _item+=$(this).height()+15; //_itemH  =  _itemH +$(this).heigt();
             });

             //채팅창 영역에 스크롤 애니메이션 이벤트 발생시킴
             $(".chat_A").stop().animate({
                 scrollTop:_itemH //위에서 계산한 말풍선 높이 총합만큼
             })

        }
;    });
});