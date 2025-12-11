import { useState, useEffect } from "react"

export const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return { user, loading }
}

export const useUserStats = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch("/api/users?limit=0&select=id")
      .then((res) => res.json())
      .then((data) => setCount(data.total))
  }, [])

  return { count }
}
