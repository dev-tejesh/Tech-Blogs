import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)
    const authentication = getAuth()

    try {
      const response = await createUserWithEmailAndPassword(authentication, email, password)
      
      // Extract the token and email from the response
      const token = await response.user.getIdToken()
      console.log(token)
      const userEmail = response.user.email

      // Save the user to local storage in JSON format
      const user = { token, email: userEmail }
      localStorage.setItem('user', JSON.stringify(user))

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: user })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      let errorMessage = 'An error occurred'

      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already in use.'
            break
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.'
            break
          case 'auth/operation-not-allowed':
            errorMessage = 'Operation not allowed.'
            break
          case 'auth/weak-password':
            errorMessage = 'Password is too weak.'
            break
          default:
            errorMessage = error.message
        }
      } else if (error.response) {
        // Server responded with a status other than 2xx
        errorMessage = error.response.data.error || errorMessage
      } else if (error.request) {
        // Request was made but no response was received
        errorMessage = 'No response from server'
      } else {
        // Something happened in setting up the request
        errorMessage = error.message
      }

      setError(errorMessage)
      toast.error(errorMessage)
      console.log(errorMessage)
    }
  }

  return { signup, isLoading, error }
}
