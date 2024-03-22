import React from 'react'
import PropTypes from 'prop-types'
import PostMetaInfo from './PostMetaInfo'
import { post } from '../utils/api'

export default function Comment ({ comment }: { comment: post }) {
  return (
    <div className='comment'>
      <PostMetaInfo
        comment={true}
        by={comment.by}
        time={comment.time}
        id={comment.id}
      />
      <p dangerouslySetInnerHTML={{__html: comment.text}} />
    </div>
  )
}