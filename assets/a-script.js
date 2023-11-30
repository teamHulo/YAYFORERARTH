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
        console.log(objCarts);
       /* $("cart-drawer").html(
          $(objCarts["cart-drawer"]).find("cart-drawer").html()
        );*/
      console.log($(objCarts["main-cart-items"]).find("cart-drawer-items"));
        $("cart-drawer cart-drawer-items").html(
          $(objCarts["main-cart-items"]).find("cart-drawer-items").html()
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

//.text('Shop Lotion')
//$('[data-id="template--16282984251551__product-grid"] .grid__item:nth-child(1) .add-my-cart').addClass('link-shop')
//$('[data-id="template--16282984251551__product-grid"] .grid__item:nth-child(1) .link-shop').removeClass('add-my-cart')
$('<a class="btn-custom" href="/products/1oz-sensitive-skin-face-lotion">Shop Lotion</a>').insertAfter($('[data-id="template--16282984251551__product-grid"] .grid__item:nth-child(1) .add-my-cart'))
$('[data-id="template--16282984251551__product-grid"] .grid__item:nth-child(1) .add-my-cart').remove()

$('<a class="btn-custom" href="/products/lip-balm">Shop Lip Balm</a>').insertAfter($('[data-id="template--16282984251551__product-grid"] .grid__item:nth-child(4) .add-my-cart'))
$('[data-id="template--16282984251551__product-grid"] .grid__item:nth-child(4) .add-my-cart').remove()


