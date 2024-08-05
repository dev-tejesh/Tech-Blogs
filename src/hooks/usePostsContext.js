
import { PostsContext } from '../context/PostContext'
import { useContext } from 'react'

export const usePostsContext = () => {
  const context = useContext(PostsContext)
  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}