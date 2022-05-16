import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setloading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(null)
  const [initialloading, setInitialLoading] = useState(true)
  const router = useRouter()

  // Persisting the user before signin
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
          setloading(false)
        } else {
          // Not logged in...
          setUser(null)
          setloading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    setloading(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        setloading(false)
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => setloading(false))
  }

  const signIn = async (email: string, password: string) => {
    setloading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user)
        router.push('/')
        setloading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setloading(false))
  }

  const logout = async () => {
    setloading(true)
    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => alert(error.message))
      .finally(() => setloading(false))
  }

  const memoValue = useMemo(
    () => ({ user, signUp, signIn, loading, logout, error }),
    [user, loading]
  )

  return (
    <>
      <AuthContext.Provider value={memoValue}>
        {!initialloading && children}
      </AuthContext.Provider>
    </>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
