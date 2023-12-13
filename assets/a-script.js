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
              $('#cart-icon-bubble').html($(objCarts["cart-icon-bubble"]).html());
              $('cart-drawer .drawer__inner').html($(objCarts["cart-drawer"]).find('.drawer__inner').html());
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
             request.open('GET', '?sections=cart-drawer,main-cart-items,cart-icon-bubble', true);///?sections=cart-drawer,
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
$('[data-id="template--16282984251551__product-grid"] .grid__item:nth-child(4) .add-my-cart').remove();

if( $('.template-product .rating').length > 0){

  $('.template-product .product__info-wrapper .rating').wrap('<a class="wrap-scroll-review"></a>');


  $('.wrap-scroll-review').click(function(event){
    var getHref = $(this).attr('href');
    var curItem = $(this)
    $('html, body').animate({
      scrollTop: curItem.closest('body').find('.section-product-reviews.container').offset().top
    }, 500);
   // event.preventDefault();
    //event.stopPropagation();
  }); 


  
}












  setTimeout(function(){

              
              console.log('aaa');
            $(document).ready(function() {
               $('product-recommendations ul li').each(function() {
                    var productTitle = $(this).find('.my-product-card .product-title h3 a').text().trim();
                    var productClass = productTitle.replace(/\s+/g, '-').toLowerCase();
                    $(this).find('.my-product-card').addClass(productClass);
                });
              
                
                $('product-recommendations .my-product-card.sensitive-skin-face-lotion').each(function() {
                    $(this).find('.product-item-custom-form-variants-item:first').addClass('active');
                });
                $('product-recommendations .my-product-card.sensitive-skin-face-lotion .product-item-custom-form-variants-item').click(function(){
                  $('product-recommendations  .my-product-card.sensitive-skin-face-lotion .product-item-custom-form-variants-item').removeClass('active');
                  $(this).addClass('active');
                });



              
               $('product-recommendations .my-product-card.lip-balm ').each(function() {
                    $(this).find('.product-item-custom-form-variants-item:first').addClass('active');
                });

                $('product-recommendations .my-product-card.lip-balm .product-item-custom-form-variants-item ').click(function(){
                  $('product-recommendations .my-product-card.lip-balm .product-item-custom-form-variants-item').removeClass('active');
                  $(this).addClass('active');
                });

        


             $('product-recommendations form .product-item-custom-form-variants-item').click(function(){
                let price = $(this).find('.price-variand').attr('data-price');
                console.log(price);
                $(this).closest('.my-product-card').find('.button-add-to-cart-dynamic-price').text('');
                $(this).closest('.my-product-card').find('.button-add-to-cart-dynamic-price').append(price);
                let prodId = $(this).find('input').val();
               console.log(prodId);
              });


            $('product-recommendations .product-item-custom-form-variants-item').click(function(){
              let prodcutIdCustom = $(this).find('input').attr('id');  
              $('product-recommendations .product-item-custom-form-input').attr('value', prodcutIdCustom);
              
               let productid = $(this).closest('.my-product-card').find('.product-item-custom-form-variants-item.active input').val();
                console.log(productid);

                $(this).closest('.my-product-card').find('.cart-id-first').val(productid);
              
            }); 

              $('product-recommendations .button-variant-cart').click(function(){
                let productid = $(this).closest('.my-product-card').find('.product-item-custom-form-variants-item.active input').val();
                console.log(productid);

                $('product-recommendations .cart-id-first').val(productid);
                
                let data = {
                  "id": productid,
                  "quantity": 1
                }
                
                $.ajax({
                  type: 'POST',
                  url: '/cart/add.js',
                  data: data,
                  dataType: 'json',
                  success: function() { 
                    document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
                      bubbles: true  //this code is for prestige theme, is to refresh the cart
                   }));
                  }
                });
            
              });
            
      
               
            });

          if (screen.width > 1020) {
              $(".product-btn").on({
                  mouseenter: function () {
                    $(this).closest('.my-product-card__wrap').find('.product-item-custom-form-variants').css('display','flex');
            
                  },
                  mouseleave: function () {
                     $(this).closest('.my-product-card ').find('.product-item-custom-form-variants').css('display','none');
                  
                  }
              });
              $(".product-item-custom-form-variants").on({
                  mouseenter: function () {
                     $(this).css('display','flex');
             
                  },
                  mouseleave: function () {
                     $(this).css('display','none');
                     
                  }
              });
          }


      if (screen.width > 1020) {
              $("product-recommendations .my-product-card .product-btn").on({
                  mouseenter: function () {
                    $(this).closest('.my-product-card__wrap').find('.product-item-custom-form-variants').css('display','flex');
            
                  },
                  mouseleave: function () {
                     $(this).closest('.my-product-card ').find('.product-item-custom-form-variants').css('display','none');
                  
                  }
              });
              $("product-recommendations .my-product-card .product-item-custom-form-variants").on({
                  mouseenter: function () {
                     $(this).css('display','flex');
             
                  },
                  mouseleave: function () {
                     $(this).css('display','none');
                     
                  }
              });
          }


    
    
     }, 2000);


             $(".product-item-custom-form-variants").on({
                  mouseenter: function () {
                     $(this).closest('.my-product-card__wrap').find('.add-my-cart').addClass('hover');
                    $(this).closest('.my-product-card__wrap').find('.add-my-cart span').addClass('active');
             
                  },
                  mouseleave: function () {
                     $(this).closest('.my-product-card__wrap').find('.add-my-cart').removeClass('hover');
                     $(this).closest('.my-product-card__wrap').find('.add-my-cart span').removeClass('active');
                  }
              });


             $(".add-my-cart").on({
                  mouseenter: function () {
                     $(this).find('span').addClass('active');
             
                  },
                  mouseleave: function () {
                     $(this).find('span').removeClass('active');
                  }
              });
