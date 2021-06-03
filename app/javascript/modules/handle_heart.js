import $ from 'jquery'
import axios from 'modules/axios'

const listenInactiveHeartEvent = (postId) => {
  $('.inactive-heart').on('click', () => {
    axios.post(`/posts/${postId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $('.active-heart').removeClass('hidden')
          $('.inactive-heart').addClass('hidden')
        }
      })
      .catch((e) => {
        window.alert('Error')
        console.log(e)
      })
  })
}

const listenActiveHeartEvent = (postId) => {
  $('.active-heart').on('click', () => {
    axios.delete(`/posts/${postId}/like`)
      .then((response) => {
          $('.active-heart').addClass('hidden')
          $('.inactive-heart').removeClass('hidden')
      })
      .catch((e) => {
        window.alert('Error')
        console.log(e)
      })
  })
}

export {
  listenInactiveHeartEvent,
  listenActiveHeartEvent
}