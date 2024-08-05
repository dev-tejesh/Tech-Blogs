import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const client = axios.create({
        baseURL: "http://localhost:4000/"
      });

      const response = await client.post('auth/signup', {
        email,
        password,
      });

      const json = response.data

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json })

      // update loading state
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      if (error.response) {
        // Server responded with a status other than 2xx
        setError(error.response.data.error)
        console.log(error.response.data.error)
      } else if (error.request) {
        // Request was made but no response was received
        setError('No response from server')
        console.log('No response from server')
      } else {
        // Something happened in setting up the request
        setError(error.message)
        console.log(error.message)
      }
    }
  }

  return { signup, isLoading, error }
}
