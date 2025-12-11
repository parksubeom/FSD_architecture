import { useState, useEffect } from "react"

// 유저 타입 정의 (필요시 types.ts로 이동)
export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  phone: string
  image: string
  company?: {
    title: string
    name: string
  }
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // 내 정보 가져오기 (1번 유저로 고정)
  useEffect(() => {
    fetch("/api/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Failed to fetch user:", err))
      .finally(() => setLoading(false))
  }, [])

  // 내 정보 수정하기
  const updateProfile = async (updatedData: Partial<User>) => {
    if (!user) return

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })
      const data = await response.json()

      // 상태 업데이트 (화면 즉시 반영)
      setUser((prev) => (prev ? { ...prev, ...data } : data))
      alert("정보가 성공적으로 수정되었습니다!")
    } catch (error) {
      console.error("Failed to update profile:", error)
      alert("수정 중 오류가 발생했습니다.")
    }
  }

  return { user, loading, updateProfile }
}
