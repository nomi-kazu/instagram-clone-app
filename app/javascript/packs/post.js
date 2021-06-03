import $ from 'jquery'
import axios from 'modules/axios'
import {
  listenInactiveHeartEvent,
  listenActiveHeartEvent
} from 'modules/handle_heart'

const handleHeartDisplay = (hasLiked) => {
  if (hasLiked) {
    $('.active-heart').removeClass('hidden')
  } else {
    $('inactive-heart').removeClass('hidden')
  }
}

document.addEventListener('turbolinks:load', () => {
  const dataset = $('#post-index').data()
  const postId = dataset.postId

  axios.get(`/posts/${postId}/like`)
    .then((response) => {
      const hasLiked = response.data.hasLiked
      handleHeartDisplay(hasLiked)
    })

  listenInactiveHeartEvent(postId)
  listenActiveHeartEvent(postId)
})