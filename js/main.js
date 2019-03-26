$(function() {
    "use strict";
    emailjs.init("user_uKBCby72HB0g4ru8V5Np0");

    var nav_offset_top = $('header').height() + 50;
    function navbarFixed(){
        if ( $('.header_area').length ){ 
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();   
                if (scroll >= nav_offset_top ) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();

    $(".hero-banner__video").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    if ($('.featured-carousel').length) {
        $('.featured-carousel').owlCarousel({
            loop: false,
            margin: 30,
            items: 1,
            nav: true,
            dots: false,
            responsiveClass: true,
            slideSpeed: 300,
            paginationSpeed: 500,
            navText : ["<div class='left-arrow'><i class='ti-angle-left'></i></div>","<div class='right-arrow'><i class='ti-angle-right'></i></div>"],
            responsive: {
                768: {
                    items: 2
                },
                1100: {
                    items: 3
                }
            }
        })
    }

    if ($('.hero-carousel').length) {
        $('.hero-carousel').owlCarousel({
            loop: false,
            margin: 30,
            items: 1,
            nav: false,
            dots: true,
            responsiveClass: true,
            slideSpeed: 300,
            paginationSpeed: 500
        })
    }

    var form = $('#order');

    form.on('submit', function(e) {
        e.preventDefault();
        let customer = form.find('[name="customer"]').val();
        let customer_phone = form.find('[name="customer_phone"]').val();
        let customer_address = form.find('[name="customer_address"]').val();
        let customer_order = form.find('[name="customer_order"]').val();
        let $submit_button = form.find('[type="submit"]');

        let regex_phone = /(0|\+84\s?)\w{9}/gm.test(customer_phone);
        let regex_address = customer_address.match(/\s/g).length;
        let regex_order = /\s+\w+/gm.test(customer_order);

        if (!regex_phone) {
            swal("","Số điện thoại của bạn chưa đúng chuẩn", "warning");
            return false;
        }
        if (regex_address < 3) {
            swal("","Địa chỉ giao hàng chưa đúng", "warning");
            return false;
        }
        if (!regex_order) {
            swal("","Thông tin đơn hàng chưa đúng", "warning");
            return false;
        }
        $submit_button.prop('disabled', true);
        $submit_button.text('Đang gửi ....');
        emailjs.send("default_service", "commetri", {
            "name": customer,
            "phone": customer_phone,
            "address": customer_address,
            "order": customer_order
        }) .then(function(response) {
            swal("Cảm ơn bạn !", "Đơn hàng của bạn đã được gửi đi, chúng tôi sẽ gọi lại cho bạn để xác nhận gửi hàng", "success");
            console.log('SUCCESS!', response.status, response.text);
            $submit_button.prop('disabled', false);
            $submit_button.text('Gửi đơn hàng');
            form.trigger('reset');
        }, function(error) {
            console.log('FAILED...', error);
        });
    });
});

        