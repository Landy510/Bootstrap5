$(document).ready(function () {
  $('.content-QA-btn').on('click', function (e) {
    $(this).parent().find('.content-QA-description').slideToggle()
    $(this).parent().toggleClass('QAList-option-active')
    $(this).find('.fa-chevron-down').toggleClass('content-QA-arrow-active')
  })
  if($(window).scrollTop() < 100) {
    $('.sponsor-mobile-btn').hide()
  }
  $(window).scroll(function () {
    const distance = Math.abs($('footer').offset().top - $(window).scrollTop())
    if ($(window).scrollTop() >= 100 && $(window).width() < 768 && distance > 1500) {
      $('.sponsor-mobile-btn').show()
    } else {
      $('.sponsor-mobile-btn').hide()    
    }
  })
});
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})