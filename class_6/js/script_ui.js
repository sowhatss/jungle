var loadData;//jason 파일의 정보를 담기 위한 전역 변수


$(function(){
    //첫 인트로 버튼 영역 함수 실행
    introfn();

    //인트로 버튼 클릭 이벤트 정의
    $(".btn_setting").click(function(){
        $(".section.box_intro").removeClass("on");
        // $(".section.reservation").addClass("on");

        //ajax를 통해 json 파일 불러온 후 append로 자리 셋팅하기 함수 실행
        ajaxfn();
    });

    //자리 선택 섹션의 완료 버튼 클릭 이벤트 정의
    $(".btn_submit").click(function(){
        $(".section.reservation").removeClass("on");
        $(".section.complete").addClass("on");
        //개발자가 서버에 내용 전달하는 과정을 담는 부분
});

})

//첫 인트로 버튼 영역 함수정의
function introfn(){

    $(".section.box_intro").addClass("on")
}

//ajax를 통해 json 파일 불러온 후 append로 자리 셋팅하기 함수 정의
function ajaxfn(){
    $.ajax({
        url:"js/data.json",
        datatype:"json",
        success:function(result){
            //변수 저장
            loadData = result.seatInfo; //seatinfo 는 데이터제이슨에서 가져옴

            //자리셋팅
            for(var i=0; i<loadData.length; i++){
                var _n = loadData[i].name;
                var _p = loadData[i].price;
                var _r = loadData[i].reserve;

                $(".section.reservation > ol").append('<li class="unit"><button data-price="'+_p+'" '+_r+'>'+_n+'</button></li>');
            
            }
            //자리 선택 섹션 노출
            $(".section.reservation").addClass("on");

            //배열선언 or 초기화
            var  selected = [];

            //동적으로 샛탕된 버튼에 클릭 이벤트 선언
            $(".section.reservation > ol >li > button").click(function(){
                //배열 초기화
                selected = [];
                //자신(디스)에게 select 유무에 따라 select클래스를 추가/삭제 (토글클래스사용)
                $(this).toggleClass("select");

                //자리길이 만큰 for문 반복 사용
                for(var i=0; i<loadData.length; i++){
                    //각각 자리별 벼튼에 seclect 클래스가 있는지 확인후 유true 무false selected = [];에저장
                    var _has = $(".section.reservation > ol >li").eq(i).find("button").hasClass("select");

                    //select클래스를 가지고있다면 뱌열에 index값 저장
                    if(_has == true){
                        selected.push(i);
                    }
                }

                var selectedSeat =""; //선택자리명 저장용 변수선언과 
                var selectedCoast = 0;//선택값 총합 저장용 변수선언과 초기화 숫자라서 0으로 표기

                //저장된 인덱스를 활용한 하단 결과값 업데이트 포문을 돌릴때 위에서 정한 selected 라고 만들어준 배열의 길이만큼 돌려봄
                for(var i=0; i<selected.length; i++){
                    var _si = selected[i]; //선택된 index값만 저장
                    //선택된 인덱스값 누적 (자기 자신에게 이전값과 새로운값을 더함)
                    //a= a자신 + 새로운값 
                    // selectedSeat = selectedSeat+loadData[_si].name +" "; 와 아래 연산값은 같다
                    selectedSeat += loadData[_si].name +" ";
                    // selectedCoast = selectedCoast+Number(loadData[_si].price);와 아래 연산값은 같다
                    selectedCoast += Number(loadData[_si].price);
                }

                //선택된 정보를 html상 각 영역에 업데이트 (text형식으로)
                $(".txt_info_number").text(selectedSeat);
                $(".txt_info_total").text(selectedCoast);

                //최종 결과창의 선택정보를 html상 완료페이지에 업데이트
                $(".section.complete .txt_number").text(selectedSeat);
                $(".section.complete .txt_price > strong").text(selectedCoast);
            });
        }
    })
}
