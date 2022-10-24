$(document).ready(function(){
    //加入購物車
//     const btn = document.getElementsByClassName('buybtn');
//     const products = [];
//     for(i=0;i<btn.length;i++){
//         let cartBtn = btn[i]
//         cartBtn.addEventListener('click', function(){
//             let product = {
//                 image: event.target.parentElement.children[0].children[0].children[1].src,
//                 name: event.target.parentElement.children[0].children[1].children[0].textContent,
//                 price: event.target.parentElement.children[0].children[1].children[2].textContent,
//                 totalPrice: parseInt(event.target.parentElement.children[0].children[1].children[2].textContent),
//                 quantity: 1,
//             }
//             addItemToLocal(product)
//         })
//     }
//     function addItemToLocal(product){
//         let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
//         if(cartItem === null){
//             products.push(product)
//             localStorage.setItem('prdInCart',JSON.stringify(products))
//         }else{
//             cartItem.forEach(item => {
//                 if(product.name == item.name){
//                     product.quantity = item.quantity += 1;
//                     product.itemAllPrice = item.totalPrice += product.Price;
//                 }else{
//                     products.push(item)
//                 }
//             })
//         products.push(product)
//         }
//         localStorage.setItem('prdInCart', JSON.stringify(products))
//         window.location.reload()
//     }
//     function dispCartItem(){
//         let html = '';
//         let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
//         cartItem.forEach(item =>{
//             html += `
//             <ul class="cartlist">
//                 <li class="iteminfo">
//                     <div class="itempic forImage">
//                         <img src="${item.image}" alt="">
//                     </div>
//                     <div class="itemname forName"><a href="itempage.html">${item.name}</a></div>
//                 </li>
//                 <li class="itemprice forPrice">${item.price}</li>
//                 <li class="itemamout">
//                     <span class="num_minus">-</span>
//                     <input type="text" class="num forQuantity" value="${item.quantity}">
//                     <span class="num_plus">+</span>
//                 </li>
//                 <li class="itemdel removeItem">
//                     <a href="">
//                         <img src="pictures/deleateIcon.svg" alt="移除">
//                     </a>
//                 </li>
//             </ul>`
//         })
//         document.querySelector('.cartdisp').innerHTML = html;
//     }
// dispCartItem()


// const removeItem = document.getElementsByClassName('removeItem');
// for(var i=0; i<removeItem.length; i++){
//     $('.removeItem').click(function(){
//         localStorage.setItem('prdInCart', JSON.stringify(products))
//         window.location.reload()
//     })
// }

    //算錢
    const setFee = () => {  //取得運費的值
        fee = $(":checked").val();
        $('#num_fee').text('NT$ ' + fee);
        check()
    }

    $('input[name="fee"]')[1].checked = true;  //預設超取120元
    setFee();

   var num = $(".num").val();
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

    $(".num_minus").click(function(){  //數量
        if(num <= 1){
            num = 1;
            discount = 0;
        }else{
            num = parseInt(num) - 1;
        }
        $('#discount').text("");
        $('.num').val(num);
        check();
    })
    $(".num_plus").click(function(){
        num ++;
        $('.num').val(num);
        
        check();
    });

    //信用卡卡號自動換格
    
    $('input').keyup(function(e){   
        if($(this).val().length == $(this).attr('maxlength'))   
        $(this).next(':input').focus();   
    });
})
