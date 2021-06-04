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

const appendNewComment = (comment) => {
  $('.comments-container').append(
   `<div class="comment-card">
      <div class="comment-user-info">
        <div class="comment-user-image"><img src="${comment.user.comment_avatar_image}"></div>
        <div class="comment-username"><p>${comment.user.username}</p></div>
        <div class="comment-content"><p>${comment.content}</p></div>
      </div>
    </div>`
  )
}

document.addEventListener('turbolinks:load', () => {
  const dataset = $('#post-show').data()
  const postId = dataset.postId

  axios.get(`/posts/${postId}/like`)
    .then((response) => {
      const hasLiked = response.data.hasLiked
      handleHeartDisplay(hasLiked)
    })

  listenInactiveHeartEvent(postId)
  listenActiveHeartEvent(postId)


  axios.get(`/posts/${postId}/comments`)
    .then((response) => {
      const comments = response.data
      comments.forEach((comment) => {
        appendNewComment(comment)
      })
    })
    .catch((error) => {
      window.alert('失敗')
    })

  $('.add-comment-btn').on('click', () => {
    const content = $('#comment_content').val()
    if (!content) {
      window.alert('コメントを入力してください')
    } else {
      axios.post(`/posts/${postId}/comments`, {
        comment: {content: content}
      })
        .then((response) => {
          const comment = response.data
          appendNewComment(comment)
          $('#comment_content').val('')
        })
    }
  })
})
