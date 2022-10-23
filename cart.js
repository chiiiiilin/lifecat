$(document).ready(function(){

    //算錢
    const setFee = () => {  //取得運費的值
        fee = $(":checked").val();
        $('#num_fee').text('NT$ ' + fee);
        check()
    }

    $('input[name="fee"]')[1].checked = true;  //預設超取120元
    setFee();

   var num = $("#num").val();
   var itemPrice = $('#itemprice').text();
   var price = $('#num_price').text('NT$ '+ itemPrice);
   var fee = $(":checked").val();
   var discount = $("#discount").text();
   var totalPrice = $('#total_price').text('NT$' + itemPrice)


    $('.fee').click(setFee);
    
    function check(){      //總計
       var price = itemPrice * num;
        $('#num_price').text('NT$ '+ price);
        if(price >= 10000){
            var discount = -Math.abs(fee);
            
            $("#discount").text('NT$' + discount);
        }else if (price < 10000){
            var discount = 0;
        }
       var totalPrice = price + parseInt(fee) + discount;
        $('#total_price').text('NT$' + totalPrice);
    }

    $("#num_minus").click(function(){  //數量
        if(num <= 1){
            num = 1;
            discount = 0;
        }else{
            num = parseInt(num) - 1;
        }
        $('#discount').text("");
        $('#num').val(num);
        check();
    })
    $("#num_plus").click(function(){
        num ++;
        $('#num').val(num);
        
        check();
    });

    //信用卡卡號自動換格
    
    $('input').keyup(function(e){   
        if($(this).val().length == $(this).attr('maxlength'))   
        $(this).next(':input').focus();   
    });
})
