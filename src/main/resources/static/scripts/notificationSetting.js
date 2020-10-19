$(function () {
    // $(".js-range-slider").ionRangeSlider();

    $(".js-range-slider").ionRangeSlider({
        type: "single",
        min: 0,
        max: 100,
        from: 50,
        // to: 50,
        grid: true,
        postfix: '%'
    });
})