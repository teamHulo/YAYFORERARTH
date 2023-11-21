class CustomSlider extends HTMLElement {
    constructor() {
      super();
        
      this.perPage = this.dataset.perPage;
      this.mobilePerPage = this.dataset.perPageMobile;
    }

    connectedCallback() {
        this.swiper = new Swiper(this, {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
              el: ".swiper-pagination",
              clickable: true
            },
                  navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
            breakpoints: {
                500: {
                  slidesPerView: +this.mobilePerPage+0.5,
                  spaceBetween: 15
                },
                990: {
                  slidesPerView: +this.perPage+0.5,
                  spaceBetween: 30
                }
            }
        })
    }



  }
  
  customElements.define('custom-slider', CustomSlider);
  