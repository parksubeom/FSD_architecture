import { PostResponse } from "../model/types"

// ✅ [핵심 변경] 환경에 따라 API 기본 주소 설정
// 개발 환경(npm run dev): '/api' -> Vite Proxy가 처리
// 배포 환경(npm run build): 'https://dummyjson.com' -> 실제 서버로 직접 요청
const isDev = import.meta.env.DEV
const BASE_URL = isDev ? "/api" : "https://dummyjson.com"

// 공통으로 사용할 URL 파라미터 생성 함수
const makeParams = (limit: number, skip: number, sortBy?: string, sortOrder?: string) => {
  let params = `limit=${limit}&skip=${skip}`
  if (sortBy && sortBy !== "none") {
    params += `&sortBy=${sortBy}&order=${sortOrder}`
  }
  return params
}

// 1. 기본 목록 조회
export const getPosts = async (
  limit: number,
  skip: number,
  sortBy?: string,
  sortOrder?: string,
): Promise<PostResponse> => {
  const params = makeParams(limit, skip, sortBy, sortOrder)
  // ✅ /api 대신 BASE_URL 사용
  const response = await fetch(`${BASE_URL}/posts?${params}`)
  return response.json()
}

// 2. 검색어 조회
export const searchPosts = async (
  query: string,
  limit: number,
  skip: number,
  sortBy?: string,
  sortOrder?: string,
): Promise<PostResponse> => {
  const params = makeParams(limit, skip, sortBy, sortOrder)
  // ✅ /api 대신 BASE_URL 사용
  const response = await fetch(`${BASE_URL}/posts/search?q=${query}&${params}`)
  return response.json()
}

// 3. 태그별 조회
export const getPostsByTag = async (
  tag: string,
  limit: number,
  skip: number,
  sortBy?: string,
  sortOrder?: string,
): Promise<PostResponse> => {
  const params = makeParams(limit, skip, sortBy, sortOrder)
  // ✅ /api 대신 BASE_URL 사용
  const response = await fetch(`${BASE_URL}/posts/tag/${tag}?${params}`)
  return response.json()
}
