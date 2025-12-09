import { Comment } from "@/entities/comment/model/types"

// 1. 댓글 가져오기
export const getCommentsByPostId = async (postId: number) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  return response.json()
}

// 2. 댓글 추가
export const addCommentApi = async (newComment: { body: string; postId: number; userId: number }) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  return response.json()
}

// 3. 댓글 수정
export const updateCommentApi = async (comment: Pick<Comment, "id" | "body">) => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: comment.body }),
  })
  return response.json()
}

// 4. 댓글 삭제
export const deleteCommentApi = async (id: number) => {
  await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
  return id // 삭제된 ID 반환
}

// 5. 댓글 좋아요
export const likeCommentApi = async (id: number, currentLikes: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: currentLikes + 1 }),
  })
  return response.json()
}
