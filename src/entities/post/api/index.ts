import { PostResponse } from "../model/types"

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
  const response = await fetch(`${BASE_URL}?${params}`)
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
  const response = await fetch(`${BASE_URL}/search?q=${query}&${params}`)
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
  const response = await fetch(`${BASE_URL}/tag/${tag}?${params}`)
  return response.json()
}
// 4. 태그 목록 조회
export const getPostTags = async (): Promise<{ url: string; slug: string; name: string }[]> => {
  const response = await fetch(`${BASE_URL}/posts/tags`)
  return response.json()
}
