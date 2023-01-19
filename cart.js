$(document).ready(function () {
    //加入購物車
    let itemList = document.querySelector("#item_group");
    let qq = JSON.parse(localStorage.getItem("qq")) || [];
    let name;
    let pic;
    let price;
    let dell;

    $(".buybtn").click(function () {
        name = $(this).data("name");
        pic = $(this).data("pic");
        price = $(this).data("price");
        updata();
        $(this).val("已加入購物車~(=^‥^)/").addClass(".buybtn");
    });
    //--推值
    function updata() {
        qq.push({
            itemName: `${name}`,
            itemPic: `${pic}`,
            itemPrice: `${price}`,
        });
        localStorage.setItem("qq", JSON.stringify(qq));
        show();
    }

    //--宣告html
    let itemClass = `<li class="oneItem">
        <ul class="cartlist">
            <li class="iteminfo">
                <div class="itempic">
                    <img src="{pic}" alt="">
                </div>
                <div class="itemname"><a href="itempage.html">{name}</a></div>
            </li>
            <li class="itemamout">
                <span class="minus">-</span>
                <div class="num">1</div>
                <span class="plus">+</span>
            </li>
            <li class="itemprice">{price}</li>
            <li class="itemtotal">{total}</li>
            <li class="itemdel remove Item" id="{id}" data-del="{del}">
                <a href="">
                    <img src="pictures/deleateIcon.svg" alt="移除">
                </a>
            </li>
        </ul>
    </li>`;

    //--替換
    function show() {
        if (qq.length == 0) {
            let itemClass = `<h3 style="text-align: center; padding: 5% 0; color: gray;">購物車內尚無商品喵( ฅ•ω•)ฅ</h3>`;
            $(itemList).append(itemClass);
            let info = document.querySelector(".card_foot");
            info.style.display = "none";
        } else {
            for (let i = 0; i < qq.length; i++) {
                newqq = qq[i];
                dell = "del" + i;

                let newItemClass = itemClass
                    .replace("{name}", newqq.itemName)
                    .replace("{pic}", newqq.itemPic)
                    .replace("{total}", newqq.itemPrice)
                    .replace("{price}", newqq.itemPrice)
                    .replace("{del}", i)
                    .replace("{id}", dell);

                $(itemList).append(newItemClass);
                $("#" + dell).click(function () {
                    remove($(this).attr("data-del"));
                });
            }
        }
    }
    show();

    //刪除
    function remove(id) {
        qq.splice(id, 1);
        localStorage.setItem("qq", JSON.stringify(qq));
    }

    //算錢
    let total = 0;
    let num = document.querySelectorAll(".num");
    let plus = document.querySelectorAll(".plus");
    let minus = document.querySelectorAll(".minus");
    let itemTotal = document.querySelectorAll(".itemtotal");
    let itemPrice = document.querySelectorAll(".itemprice");
    let fee = $(":checked").val();
    let subTotal = 0;
    let discount = 0;
    let TTL = 0;

    //--加減
    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", () => {
            num[i].innerText = parseInt(num[i].innerText) + 1;
            count(i);
        });
        minus[i].addEventListener("click", () => {
            if (num[i].innerText == 1) {
                num[i].innertext = 1;
                count(i);
            } else {
                num[i].innerText = parseInt(num[i].innerText) - 1;
                count(i);
            }
        });

        function count(i) {
            total = itemPrice[i].innerText * num[i].innerText;
            itemTotal[i].innerText = total;
            subTotal = 0;
            check();
        }
    }

    //--取得運費的值
    let setFee = () => {
        fee = $(":checked").val();
        $("#num_fee").text("NT$ " + fee);
    };
    $(".fee").click(function () {
        setFee();
        subTotal = 0;
        check();
    });

    $('input[name="fee"]')[1].checked = true; //預設超取120元
    setFee();

    //--總計
    function check() {
        console.log(itemTotal);
        itemTotal.forEach(function (element) {
            subTotal += parseInt(element.innerText);
        });
        if (subTotal >= 10000) {
            discount = -Math.abs(fee);
            $("#discount").text("NT$" + discount);
        } else {
            discount = 0;
            $("#discount").text("");
        }
        TTL = Number(subTotal) + Number(fee) + Number(discount);
        $("#total_price").text("NT$" + TTL);
        $("#num_price").text("NT$ " + subTotal);
    }
    check();

    function setDiscount() {}

    //信用卡卡號自動換格
    $("input").keyup(function (e) {
        if ($(this).val().length == $(this).attr("maxlength"))
            $(this).next(":input").focus();
    });
});
