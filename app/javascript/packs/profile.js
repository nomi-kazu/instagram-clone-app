import $ from 'jquery'
import axios from 'modules/axios'

document.addEventListener('turbolinks:load', function()  {
 
  $('.profile_usericon').on('click', () => {
    if ($('.avatar_edit_form').hasClass('hidden')){
      $('.avatar_edit_form').removeClass('hidden')
    } else {
       $('.avatar_edit_form').addClass('hidden')
    }
  })
 })
