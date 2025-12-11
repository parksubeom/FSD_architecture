import { User, UserResponse } from "../model/types"

// ✅ 배포 환경 대응 로직 추가
const isDev = import.meta.env.DEV
const BASE_URL = isDev ? "/api" : "https://dummyjson.com"

// 기존: 목록 가져오기
export const getUsers = async (): Promise<UserResponse> => {
  const response = await fetch(`${BASE_URL}/users?limit=0&select=username,image`)
  return response.json()
}

// 추가: 특정 유저 상세 정보 가져오기 (ID로 조회)
export const getUserDetail = async (userId: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`)
  return response.json()
}
