(function(){
    function directCarousel(){
            var unitDom = $('.bl-sidebar-tab-unit'),
                unitParentBox = $('.bl-sidebar-tab-con'),
                unitLen = unitDom.length,
                j=Math.ceil(unitLen/3),
                moveNum=j,
                unitDomTopNum = 0,
                gVal = 82*3,
                unitDomTop = '';
            $('#upward').off('click');
            $('#downward').off('click');
            (function(num){
                $('#upward').on('click',function(){
                    var self = $(this);
                    if(num>1){
                        unitDomTopNum -= gVal;
                        unitDomTop = unitDomTopNum + 'px';
                        unitParentBox.css('top',unitDomTop);
                        num--;
                        //alert(num);
                    }else{
                        num=0;
                    }

                    if(num<moveNum){
                        self.siblings('.bl-btn-arrow-box').removeClass('un-bottom-btn');
                    }

                    if(num<=1){
                        self.addClass('un-up-btn');
                        //self.siblings('.bl-btn-arrow-box').removeClass('un-bottom-btn');
                    }else{
                        self.removeClass('un-up-btn');
                    }
                });

                $('#downward').on('click',function(){
                        var self = $(this);
                        if(num<moveNum){
                            unitDomTopNum += gVal;
                            unitDomTop = unitDomTopNum + 'px';
                            unitParentBox.css('top',unitDomTop);
                            num++;
                            //alert(num);
                        }else{
                            num = moveNum;
                        }

                        if(num>=1){
                            self.siblings('.bl-btn-arrow-box').removeClass('un-up-btn');
                        }
                        if(num>=moveNum){
                            self.addClass('un-bottom-btn');
                            //self.siblings('.bl-btn-arrow-box').removeClass('un-up-btn');
                        }else{
                            self.removeClass('un-bottom-btn');
                        }
                });
            })(j);

    };

    function horizCarousel(){
        var objDom = $('.medal-img-box'),
            objParentBox = $('.bl-sidebar-medal-con'),
            objLen = objDom.length,
            j = Math.ceil(objLen/4),
            len = j,
            objDomLeftNum = 0,
            gVal = 40*4,
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

    function tabFun(id){
        var $tabBtn = $(id).find('.j-tab-btn'),
            $tabWrap = $(id).find('.j-tab-wrap');
            $(id).on('click','.j-tab-btn',function(){
                var $self = $(this),
                    index = $self.index();
                $tabBtn.removeClass('act');
                $tabWrap.removeClass('show');
                $self.addClass('act');
                $tabWrap.eq(index).addClass('show');
            });

    };

    $(function(){
        var isIE6 = navigator.userAgent.indexOf("MSIE 6.0");
        if(isIE6 > 0){//判断是否为IE6
            $('#sideBarBtn').on('mouseenter mouseleave',function(){
                $(this).find('.bl-sidebar-box').toggle();
            });
        }
        
        directCarousel();
        horizCarousel();
        tabFun('#sideBarTab');
    });
})();