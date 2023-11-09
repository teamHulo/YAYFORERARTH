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
            breakpoints: {
                500: {
                  slidesPerView: +this.mobilePerPage+0.5,
                  spaceBetween: 15
                },
                767: {
                  slidesPerView: +this.perPage+0.5,
                  spaceBetween: 30
                }
            }
        })
    }



  }
  
  customElements.define('custom-slider', CustomSlider);
  