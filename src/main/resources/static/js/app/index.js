var main = {
    init : function () {
        var _this = this;
        $('.btn-delete-many-file').on('click', function(){
            var fileId = $(this).siblings('input').val();
            _this.deleteManyFile(fileId);
            location.reload(true);
        })
        $('#btn-delete-file').on('click', function(){
            _this.deleteFile();
            //location.reload(true);
            //Posts테이블의 file_id 값도 수정해야 하기 때문에 아래 추가
           _this.update();//파일 삭제 후 현재페이지를 업데이트 한다
        })
        $('#btn-save').on('click', function(){
            _this.save();
        })
        $('#btn-update').on('click', function(){
            _this.update();
        })
        $('#btn-delete').on('click', function(){
            _this.delete();
        })
    },
    deleteManyFile : function(fileId) {
        $.ajax({
            async: false,//게시물 등록시 첨부파일은 비동기에서 동기로 바꿔야지만, 업로드 후 게시물이 저장됩니다.
            type: 'DELETE',
            url: '/api/many_file_delete/' + fileId,
            //dataType: 'text',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
        }).done(function(result){
            alert('첨부파일 삭제 성공 ' +  result.success);
        }).fail(function(error){
            alert('첨부파일 삭제 실패 ' + JSON.stringify(error));
        });
    },
    saveManyFile : function(post_id, fileSun) {
        var _this = this;
        var form = $('#form_posts')[0];
        var formData = new FormData();//(form)
        formData.append('post_id', post_id);
        //formData.append("textInput",$('#textInput').val());    //text 타입 선택
        if(fileSun == "fileSun1") {
            formData.append("many_file",$("input[name=many_file]")[0].files[0]);  //file 타입 선택
        }
        if(fileSun == "fileSun2") {
            formData.append("many_file",$("input[name=many_file]")[1].files[0]);  //file 타입 선택
        }
        //파일이 여러개 일때 다른 방법(아래)
        //"manyFile[]"와 같이 "[]"를 붙여 배열타입으로 받을 수 있도록 한다.
        $.ajax({
            async: false,//게시물 등록시 첨부파일은 비동기에서 동기로 바꿔야지만, 업로드 후 게시물이 저장됩니다.
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/api/many_file_upload",
            data: formData,
            processData: false,//formData 를 QueryString 으로 변환하지 않는다.
            contentType: false,//multipart/form-data; boundary=----WebKitFormBoundaryzS65BXVvgmggfL5A
            cache: false,
            timeout: 600000,
            dataType: 'json',
            beforeSend:function(){
                //이미지 보여주기 처리
                $('.wrap-loading').removeClass('display-none');
            },
            complete:function(){
                //이미지 숨김 처리
                $('.wrap-loading').removeClass('display-none');
            },
            success: function (result) {
                alert("첨부파일 OK : " + result);//점부파일 PK 값
            },
            //complete: _this.save,
            error: function (e) {
                console.log("ERROR : ", e);
                alert("첨부파일 업로드가 실패했습니다.");
                return;
            }
        });
    },
    deleteFile : function() {
        var fileId = $('#file_id').val();
        $.ajax({
            async: false,//게시물 등록시 첨부파일은 비동기에서 동기로 바꿔야지만, 업로드 후 게시물이 저장됩니다.
            type: 'DELETE',
            url: '/api/file_delete/' + fileId,
            //dataType: 'text',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
        }).done(function(result){
            $("#file_id").val("");
            alert('첨부파일 삭제 성공 ' +  result.success);//FileUtilsApi.java 의 jsonResult.put("success", "OK");에서 입력한 OK가 출력된다.
        }).fail(function(error){
            alert('첨부파일 삭제 실패 ' + JSON.stringify(error));//stringify함수는 json 객체를 문자열로 변경한다.
        });
    },
    saveFile : function() {
        var _this = this;
        var form = $('#form_posts')[0];//첫 번째 입력 폼 객체 선언
        var formData = new FormData(form);//폼의 첨부파일 입력 데이터 객체 생성
        $.ajax({
            async: false,//게시물 등록시 첨부파일은 비동기에서 동기로 바꿔야지만, 업로드 후 게시물이 저장됩니다.
            type: "POST",
            enctype: 'multipart/form-data',//전송타입을 분할 폼 데이터로 지정
            url: "/api/file_upload",
            data: formData,
            processData: false,//formData 를 QueryString 으로 변환하지 않는다.스트림형태이기 때문에
            contentType: false,//multipart/form-data; boundary=----WebKitFormBoundaryzS65BXVvgmggfL5A
            cache: false, //캐시라는 임시저장소도 사용하지 않는다.
            timeout: 600000, //대기시간 단위 밀리초=600초=10분 동안 업로드 시간을 부여한다.
            dataType: 'json', //응답 받는 데이터 형태지정
            beforeSend:function(){
                //이미지 보여주기 처리, 현재는 동기처리이기 때문에 의미가 없다.
                $('.wrap-loading').removeClass('display-none');
            },
            complete:function(){
                //이미지 숨김 처리, 현재는 동기처리이기 때문에 의미가 없다.
                $('.wrap-loading').removeClass('display-none');
            },
            success: function (result) {
                alert("첨부파일 OK : " + result); //성공 후 응답 받은 파일 id 값을 출력한다.
                $("#file_id").val(result); //파일 id 값을 input 태그의 값으로 저장한다.
            },
            //complete: _this.save,
            error: function (e) {
                $("#file_id").val("");
                console.log("ERROR : ", e);
                alert("첨부파일 업로드가 실패했습니다.");
                return;
            }
        });
    },
    save : function () {
        var _this = this;
        if($("#customFile").val() != "") {
            _this.saveFile();
            //alert($('#file_id').val());
        }
        var data = {
            title: $('#title').val(),
            author: $('#author').val(),
            content: $('#content').val(),
            fileId: $('#file_id').val()
        };
        $.ajax({
            type: 'POST',
            url: '/api/posts/save',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            /*
            beforeSend : function(xhr) {
                if (false) {
                    xhr.abort();
                }
            },
            */
            data: JSON.stringify(data)
        }).done(function(result){
            if($("input[name='many_file']")[0].files.length > 0) {
                _this.saveManyFile(result, "fileSun1");
            }
            if($("input[name='many_file']")[1].files.length > 0) {
                _this.saveManyFile(result, "fileSun2");
            }
            alert('글이 등록되었습니다.' + result);
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },
    update : function () {
        var _this = this;
        var id = $('#id').val();
        if($("#customFile").val() != "") {
            if($("#file_id").val() != "") {// && $("#file_id").val() != undefined) {
                _this.deleteFile();
            }
            _this.saveFile();
        }
        var uploadedCount = $(".file_id").children("input[name='file_id']").length
        if($("input[name=many_file]")[0].files.length > 0) {
            //var fileId =  $(".file_id").children("input[name='file_id']:first").val();
            var fileId = $(".file_id input[name='file_id']")
                              .map(function(){ return $(this).val() })
                                .get(0);
            alert("1여기 " + fileId);
            if(typeof fileId != "undefined" && uploadedCount >= 1) {
                _this.deleteManyFile(fileId);
            }
            _this.saveManyFile(id, "fileSun1");
        }
        if($("input[name=many_file]")[1].files.length > 0) {
            //var fileId =  $(".file_id").children("input[name='file_id']:last").val();
             var fileId = $(".file_id input[name='file_id']")
                              .map(function(){ return $(this).val() })
                                .get(1);
            alert("2여기 " + uploadedCount);
            if(typeof fileId != "undefined" && uploadedCount >= 2) {
                _this.deleteManyFile(fileId);
            }
            _this.saveManyFile(id, "fileSun2");
        }
        var data = {
            title: $('#title').val(),
            content: $('#content').val(),
            fileId: $('#file_id').val()
        };
        $.ajax({
            type: 'PUT',
            url: '/api/posts/' + id,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function(){
            alert('글이 수정되었습니다.');
            //window.location.href = "/";
            location.reload();
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },
    delete : function () {
        if(!confirm("정말로 삭제 하시겠습니까?")) {
            return;
        }
        var _this = this;
        if($("#file_id").val() != "") {// && $("#file_id").val() != undefined) {
            _this.deleteFile();
        }
        var uploadedCount = $(".file_id").children("input[name='file_id']").length
        //var fileId =  $(".file_id").children("input[name='file_id']:first").val();
        var fileId = $(".file_id input[name='file_id']")
                         .map(function(){ return $(this).val() })
                           .get(0);
        if(typeof fileId != "undefined" && uploadedCount >= 1) {
             _this.deleteManyFile(fileId);
        }
        //var fileId =  $(".file_id").children("input[name='file_id']:last").val();
        var fileId = $(".file_id input[name='file_id']")
                         .map(function(){ return $(this).val() })
                           .get(1);
        if(typeof fileId != "undefined" && uploadedCount >= 2) {
             _this.deleteManyFile(fileId);
        }
        var id = $('#id').val();
        $.ajax({
            type: 'DELETE',
            url: '/api/posts/' + id,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
        }).done(function(){
            alert('글이 삭제되었습니다.');
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    }
};

main.init()
