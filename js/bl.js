function blSlider(dom){//无缝轮播方法
    var $blIndexSlider = $(dom);
    if($blIndexSlider){
        $blIndexSlider.slider();
    }
};

function horizCarousel(){//普通水平轮播方法
    var objDom = $('.doyen-img-box'),
        objParentBox = $('.bl-index-doyen-con'),
        objLen = objDom.length,
        j = Math.ceil(objLen/3),
        len = j,
        objDomLeftNum = 0,
        gVal = 60*3,
        objDomLeft = '';
        $('#prev').off('click');
        $('#next').off('click');
        (function(num){
            $('#next').on('click',function(){
                var self = $(this);
                if(num>1){
                    objDomLeftNum -= gVal;
                    objDomLeft = objDomLeftNum + 'px';
                    objParentBox.css('left',objDomLeft);
                    num--;
                    //alert(num);
                }else{
                    num=1;
                }
                if(num<len){
                    self.siblings('#prev').removeClass('un-ca-btn');
                }
                if(num<=1){
                    self.addClass('un-ca-btn');
                }else{
                    self.removeClass('un-ca-btn');
                }
            });

            $('#prev').on('click',function(){
                var self = $(this);
                if(num<len){
                    objDomLeftNum += gVal;
                    objDomLeft = objDomLeftNum + 'px';
                    objParentBox.css('left',objDomLeft);
                    num++;
                    //alert(num);
                }else{
                    num = len;
                }
                if(num>=1){
                    self.siblings('#next').removeClass('un-ca-btn');
                }
                if(num>=len){
                    self.addClass('un-ca-btn');
                }else{
                    self.removeClass('un-ca-btn');
                }
            });

        })(j);
};

var bLpopToggle = {//模态框打开关闭功能
    popOpen : function(dom){
        var self = this;
        $(dom).on('click',function(){
            var popTarget = $(this).attr('pop-target');
            $('#'+popTarget).show();
            $('#popShadow').show();
        });
    },
    popClose : function(dom){
        var self = this;
        $(dom).on('click',function(){
            $(this).parents('.pop-box').hide();
            $('#popShadow').hide();
        });
    },
    init : function(opendom,closedom){
        var self = this;
        self.popOpen(opendom);
        self.popClose(closedom);
    }
};

function blIndexSign(){
    var $blIndexSign = $('#blIndexSign'),
        $blIndexSignCount = $('#blIndexSignCount'),
        $blSignTxt = $('#blSignTxt'),
        signTxt = '已签到';
        function signCountHide(){
            $blIndexSignCount.hide();
        };
    $blIndexSign.on('click',function(){
        var $self = $(this);
        $self.attr('disabled','disabled');
        $self.parent().addClass('bitb-act');
        $blSignTxt.text(signTxt);
        $blIndexSignCount.show();
        setTimeout(signCountHide, 1000);
    });

};

function blIndexEnter(){
    var $blIndexEnter = $('#blIndexEnter'),
        $blEnterTxt = $('#blEnterTxt'),
        blEnterTxt = '已关注品牌馆';
    $blIndexEnter.on('click',function(){
        var $self = $(this);
        $self.attr('disabled','disabled');
        $self.parent().addClass('bitb-act');
        $blEnterTxt.text(blEnterTxt);
    });
};

function blTab(){//切换方法
    var $noboxUl = $('#noboxUl'),
        $noboxDl = $('#nobox').find('>dl');
    $noboxUl.on('click','li',function(){
        var $self = $(this),
            index=$self.index();
        $self.addClass('on');
        $self.siblings().removeClass('on');
        $noboxDl.hide();
        $noboxDl.eq(index).show();
    });
};

var blDropDownFunc = {//模拟下拉菜单
    dropDownToggle : function(){
        var self = this;
        $('.dropdown').on('click',function(){
                $(this).toggleClass('open');
            }
        );
        $(document).on('click',function(e){//点击下拉菜单外部区域，关闭下拉菜单
            var target = $(e.target);
            if(target.closest('.dropdown').length == 0){
                $('.dropdown').removeClass('open');
            }
        });
    },
    dropDownMenu : function(){
        var self = this;
        $('.dropdown-option').on('click',function(){
            var $self = $(this),
                thisTxt = $self.text(),
                thisVal = $self.attr('value');
            $self.parents('.dropdown').find('.dropdown-toggle .select-value').text(thisTxt);
        });
    },
    init : function(){
        var self = this;
        self.dropDownToggle();
        self.dropDownMenu();
    }
};

var blGradeIdObj = {//评分星星组ID集合
    "1":"blGrowGrade",
    "2":"blKnownGrade",
    "3":"blPlaceGrade",
    "4":"blPriceGrade",
    "5":"blBrainsGrade"
};

var blGradeGroup = {
    blGradeFun : function(sid){//评分方法
        //参数SID为星星评分组的ID
        var self = this,
            oPf=document.getElementById(sid),
            aLi=oPf.getElementsByTagName('i'),
            aInp = oPf.getElementsByTagName('input'),
            aScore = oPf.getElementsByTagName('b'),
            i=0,
            len = aLi.length;

        for(i=0;i<len;i++){
            aLi[i].index=i;
        }
        oPf.onmouseover = null;
        oPf.onmousedown = null;

        oPf.onmouseover = function(e){
            var e = e || window.event,
                target = e.srcElement || e.target;
            if(target.tagName == "I"){
                for(i=0;i<len;i++){
                    if(i<=target.index)
                    {
                        aLi[i].className="act";
                    }
                    else
                    {
                        aLi[i].className="";
                    }
                }
                aInp[0].value = target.index+1;
                aScore[0].innerHTML = (target.index+1)+"分";
            }
        };

        oPf.onmousedown=function (e)
        {
            var e = e || window.event,
                target = e.srcElement || e.target;
            if (target.tagName == "I") {
                alert('评分成功:'+(target.index+1)+'分');
            }
        };
    },
    init : function(obj){
        //参数obj为星星评分组的ID集合
        var self = this;
        if( obj.constructor == Object){
            for(var i in obj){
                var cid = obj[i],
                    oPf = document.getElementById(cid);
                if(oPf){//判断是否有星星评分的ID
                    self.blGradeFun(cid);//执行评分方法
                }
            }
        }
    }
};

function blInpFocus(pid){//表单focus方法
    var $title = $(pid);
    $title.on({
        focus : function(){
            var $self = $(this),
                defaultVal = $self[0].defaultValue,
                inpVal = $self.val();
                if(inpVal == defaultVal){
                    $self.val('');
                }
        },
        blur : function(){
            var $self = $(this),
                defaultVal = $self[0].defaultValue,
                inpVal = $self.val();
                if(inpVal == ''){
                    $self.val(defaultVal);
                }
        }
    });

};

function blGetLength(str){ 
    var realLength = 0,len = str.length,charCode = -1; 
    for(var i=0;i<len;i++){ 
        charCode = str.charCodeAt(i); 
        if(charCode>0 && charCode<=128) realLength +=1; 
        else realLength += 2; 
    }
    return realLength; 
};

function blMotherPopForm(){ //校验寄语方法
    var blMotherPopForm = $('#blMotherPopForm');
    /* $blMotherPopForm.validate({
        rules:{
            blMotherWord:{
                required : true,
                maxlength : 100,
                isLegalCharacter : true
            }

        },
        messages:{
            blMotherWord:{
                required: "文本不能为空",
                maxlength: "文本最多100个字",
                isLegalCharacter: "输入文本含有非法字符"
            }
        },
        submitHandler: function(){
            checkSW(); //执行异步提交方法
            return false;
        }
    });*/
    blMotherPopForm.submit(function(){
        //异步提交信息方法
        var post_data = $("#send_word").val(),
            post_url = "{:U('sendWordAjax','',true,true)}",     // 异步获得该分类的维度信息
            showInfo = $("#showInfo"),
            showInfoDom = showInfo[0],
            errorShow = $("#error_show"),
            htmlStr = '<p class="bl-index-pop-subTitle">添加成功</p><div class="bl-index-pop-sub-box"><input type="button" value="确定" id="success_id" onclick="javascript:close_win();"></div>',
            regPattern = /^[^\|"'<>]*$/,
            isLegalCharacter = regPattern.test(post_data),
            strLen = blGetLength(post_data);
            //alert(strLen);
        if(post_data == ''){                        
            errorShow.text("内容不能为空！");
            return false;
        }else if(!isLegalCharacter){
            errorShow.text("内容含有非法字符");
            return false;
        }else if(strLen>200){
            errorShow.text("内容不能超过200个字符");
        }else{
            errorShow.empty();
        }

       
        /*$.ajax({
            url:post_url,
            data:"content="+post_data,
            type:"post",
            datatype:"json",
            success:function(msg){              
                 if(msg['code'] == 1){
                    showInfoDom.innerHTML = htmlStr;
                    
                 }else{
                     showInfoDom.innerHTML = msg.msg;
                 }
            }
        });*/
        return false;
    });
};
function kbpost(str){
    
    var kb_type = str;
    var product_id = $("#product_id").val();
    var type_id = $("#type_id").val();
    var new_name = $("#new_name").val();
    var show_error1 = show_error2 = '';
    var regPattern = /^[^\|"'<>]*$/;
    
    if(product_id == ''){
        show_error1 += "请选择产品名称,"; 
    }
    if(type_id == ''){
        show_error1 += "请选择类型,"; 
    }
    if(product_id == -1 && new_name == ''){
        show_error1 += "自定义产品，必须填写产品名称,";
        var new_isLegalCharacter = regPattern.test(new_name),
            new_strLen = blGetLength(new_name);

        if(!new_isLegalCharacter){
            show_error1 += "内容含有非法字符,";
        }

        if(new_strLen > 50){
            show_error1 += "内容不能超过50个字符,";
        }
        
    }
    
    show_error1 = show_error1.substr(0,show_error1.length-1);   
    
    var title = $("#title").val(),
        title_isLegalCharacter = regPattern.test(title),
        title_strLen = blGetLength(title);
    if(title == ''){
        show_error2 +=  "标题不能为空,";
    }else if(!title_isLegalCharacter){
        show_error2 +=  "内容含有非法字符,";
    }else if(title_strLen > 100){
        show_error2 +=  "内容不能超过100个字符,";
    }
    var kb_content = $("*[name='kb_content']").val();
    if(kb_content == ''){
        show_error2 +=  "内容不能为空,";
    }
    
    show_error2 = show_error2.substr(0,show_error2.length-1);
    if(show_error1 != ''){
        $("#error_show1").html('<font color="#FF0000">'+show_error1+'</font>');     
    }
    
    if(show_error2 != ''){
        $("#error_show2").html('<font color="#FF0000">'+show_error2+'</font>');
    }
    if(show_error1 != '' || show_error2 != ''){
        return false;
    }
    if(str == 1){
        $("#kb_type").val(1);
        return true;
    }else if(str == 4){
        $("#kb_type").val(4);
        $("#kb_post").submit();
    }
    return true;
};
$(function(){
    blSlider('#blIndexSlider');//执行首页轮播方法
    horizCarousel();//执行普通水平轮播方法
    bLpopToggle.init('#blIndexEnter','.pop-close');//执行首页答题模态框方法
    bLpopToggle.init('#blMotherSay','.pop-close');//执行添加寄语模态框方法
    blIndexEnter();
    blIndexSign();
    blTab(); //执行妈妈说切换
    blDropDownFunc.init();//执行自定义下拉菜单方法
    blGradeGroup.init(blGradeIdObj);//执行频分星星方法
    blInpFocus('#title');//表单focus方法
    blMotherPopForm();
    //kbPostValidate();
    $('a.bl-praise-link:first').addClass('bl-praise-link-first');
});