import React from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts, post } from '../utils/api'
import Loading from './Loading'
import PostsList from './PostsList'

interface postsState {
  loading: boolean | null;
  error: string | null;
  posts: post[] | null;
}

interface poststFetchAction {
  type: 'fetch';
}

interface poststSuccessAction {
  type: 'success';
  posts: post[];
}

interface poststErrorAction {
  type: 'error'
  error: string;
}

type postsActions = poststFetchAction | poststSuccessAction | poststErrorAction;

function postsReducer (state: postsState, action: postsActions) {
  if (action.type === 'fetch') {
    return {
      posts: null,
      error: null,
      loading: true
    }
  } else if (action.type === 'success') {
    return {
      posts: action.posts,
      error: null,
      loading: false,
    }
  } else if (action.type === 'error') {
    return {
      posts: state.posts,
      error: action.error,
      loading: false
    }
  } else {
    throw new Error(`That action type is not supported.`)
  }
}

export default function Posts ({ type }: {  type: string }) {
  const [state, dispatch] = React.useReducer(
    postsReducer,
    { posts: null, error: null, loading: true }
  )

  React.useEffect(() => {
    dispatch({ type: 'fetch' })

    fetchMainPosts(type)
      .then((posts) => dispatch({ type: 'success', posts }))
      .catch(({ message }) => dispatch({ type: 'error', error: message }))
  }, [type])


    if (state.loading === true) {
      return <Loading />
    }

    if (state.error) {
      return <p className='center-text error'>{state.error}</p>
    }

    return <PostsList posts={state.posts} />
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new'])
}