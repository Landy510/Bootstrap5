$(document).ready(function () {
  $('.content-QA-btn').on('click', function (e) {
    $(this).parent().find('.content-QA-description').slideToggle()
    $(this).parent().toggleClass('QAList-option-active')
    $(this).find('.fa-chevron-down').toggleClass('content-QA-arrow-active')
  })
});