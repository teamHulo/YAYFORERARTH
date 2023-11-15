$(()=>{
  let swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

    function handleResponse() {
        let a = this.responseText;
        let parser = new DOMParser();
        let objCarts = JSON.parse(this.responseText);
        $("#cart-icon-bubble").html($(objCarts["cart-icon-bubble"]).html());
        $("cart-drawer").html(
          $(objCarts["cart-drawer"]).find("cart-drawer").html()
        );
      }

    $(document).on('click',".add-my-cart", function (e) {
        console.log('CLICK')
        e.preventDefault();
        let variant = $(this)
          .closest(".my-product-card")
          .find(".cart-id-first")
          .val();
        formData = {
          id: variant,
          quantity: 1,
        };
    
        fetch(window.Shopify.routes.root + "cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            const request = new XMLHttpRequest();
            request.addEventListener("load", handleResponse);
            request.open(
              "GET",
              "?sections=cart-drawer,main-cart-items,cart-icon-bubble",
              true
            ); ///?sections=cart-drawer,
            request.send();
            $("cart-drawer")[0].open();
            return response.json();
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(function () {
            $("cart-drawer").removeClass("is-empty");
          });
      });
})


//policy tabs 
$('.policy-tabs .item h3').click(function(){
    $(this).closest('.item').toggleClass('active');
});


//faq tabs
$('.custom-faq-section .page-width .item h3').click(function(){
    $(this).closest('.item').toggleClass('active');
});

if ($(window).width() < 990){
   $('.custom-faq-section .page-width .item').removeClass('active');
}

//hover section slides animation

$(document).ready(function(){
    $('.section-slider .swiper-slide .right').mouseenter(function(){
       $('.section-slider .swiper-button-next').addClass('active-class');
       $('.section-slider .swiper-button-prev').addClass('active-class');
      
      
    });

    $('.section-slider .swiper-slide .left').mouseleave(function(){
       $('.section-slider .swiper-button-next').removeClass('active-class');
       $('.section-slider .swiper-button-prev').removeClass('active-class');
    });
});





