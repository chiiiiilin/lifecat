    //不能正常運作哈哈哭
    
    document.cookie = "lifecat = ya";
    function getCookie(user) {
    var cookieArr = document.cookie.split(";");
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if(user == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    console.log(cookiePair[1]);
    }

    function checkCookie() {
    var user = getCookie("lifecat");
    if (user == "ya") {
        $('.loadingwrapper').css('display','none');
    }else {
        $(document).ready(function(){
            document.cookie = `lifecat = ya; max-age = ${15*60}`;
             //loadingpage
            setTimeout(function(){  
                $('.loadingpage').fadeOut(3000);
                $(".bar").attr("style", "animation: bar 2s ease;");
            },2000)
                

            setTimeout(function(){
                $('.loadingwrapper').remove();
            },5000)
        })
    }
    }
    checkCookie();