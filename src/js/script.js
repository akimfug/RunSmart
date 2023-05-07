document.addEventListener('DOMContentLoaded', function() {
    $('.carousel__inner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 700,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="images/icons/left.png"</button>',
        nextArrow: '<button type="button" class="slick-next"><img src="images/icons/right.png"</button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                dots: true,
                arrows: false
              }
            }
        ]
    });
})