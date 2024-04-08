
//1.點擊 welcome message，將文字改成 Have a Good Time!
//JavaScript：
// let welcomeMessage = document.querySelector('.welcome-message');
// welcomeMessage.addEventListener('click', function () {
//     this.querySelector('h2').textContent = 'Have a Good Time!';
// });

//jQuery：
$(".welcome-message").click(() => {
    $(".welcome-message").find("h2").text("Have a Good Time!");
});

//2.點擊 call-to-action button，顯示隱藏的內容
//JavaScript：
// let callToActionButton = document.querySelector('.call-to-action button');
// let hiddenContentcontainer = document.querySelector('.content-container.hidden');
// callToActionButton.addEventListener('click', function () {
// if (hiddenContentcontainer.style.display === 'none' || hiddenContentcontainer.style.display === '') {
//     hiddenContentcontainer.style.display = 'flex';
// }
// else {
//     hiddenContentcontainer.style.display = 'none';
// }
// });

//jQuery方法一：
// $(".call-to-action button").click(() => {
//     if($(".content-container.hidden").css("display") === "none"){
//         $(".content-container.hidden").css("display", "flex");
//     }
//     else {
//         $(".content-container.hidden").css("display", "none");
//     }
// });

//jQuery方法二：

$(".call-to-action button").click(() => {
    if ($(".content-container.hidden").css("display") === "none") {
        $(".content-container.hidden").css("display", "flex");
    }
    else {
        $(".content-container.hidden").hide();
    }
});