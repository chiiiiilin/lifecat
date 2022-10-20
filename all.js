$().ready(function(){

    $(window).scroll(function() {
        let before = $(this).scrollTop();
        $(window).scroll(function(){
            let after = $(this).scrollTop();
            if(after > before){
                $('.navbar').slideUp(500);
                before = after;
            }else if (before > after){
                $('.navbar').slideDown(500);
                before = after;
            }
        })
        
    })

    //點小圖看大圖
   function showLarge(e){
   let small = e.target;
   document.getElementById("largeImg").src = small.src;
   }
   
   function init(){
       let imgs = document.querySelectorAll("#smallPanel img");
       for(let i=0; i<imgs.length; i++){
           imgs[i].onclick = showLarge;
       }
   }
   window.addEventListener("load", init, false); 

   //數量加減
   let num = $("#num").val();
   $("#num_minus").click(function(){
       if(num <= 1){
           num = 1;
       }else{
           num = parseInt(num) - 1;
       }
       $("#num").val(num);
   })
   $("#num_plus").click(function(){
       num = parseInt(num) + 1;
       $("#num").val(num);
   });

   //加入購物車
   $(".buybtn").click(function(){
       $(this).val("已加入購物車~(=^‥^)/").addClass(".buybtn");
   })
   //字數剩餘提示
   let textMax = $("#talk").attr("maxlength")
   $("#feedback").html(`剩餘 <span">${textMax}</span> 字`)
   $("#talk").keyup(function(){
       let textLength = $(this).val().length
       $("#feedback").html(`剩餘<span>${textMax - textLength}</span>字`)
   })

   //留言
   $(":submit").click(function(){
       let ul = $("#comments");
       let text = $("#talk").val();

       if(text == ""){
           alert("請輸入留言~(=^‥^)/");
           return false;
       }else{
           let li = document.createElement('li');
           li.className = "oneComment";
           li.innerText = text;
           ul.append(li);
       }

       $("#talk").val() = "";    //為啥沒用啦???
   })
   
})
 