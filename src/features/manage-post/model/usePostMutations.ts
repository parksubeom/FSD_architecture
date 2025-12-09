import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPostApi, updatePostApi, deletePostApi } from "../api"
import { Post } from "@/entities/post/model/types"

export const usePostMutations = () => {
  const queryClient = useQueryClient()

  // 1. 게시글 추가
  const addMutation = useMutation({
    mutationFn: addPostApi,
    onSuccess: (newPost) => {
      // 가짜 API라 실제로 저장이 안 되므로, 화면(Cache)에 강제로 끼워넣기
      queryClient.setQueriesData({ queryKey: ["postList"] }, (oldData: any) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          posts: [newPost, ...oldData.posts], // 새 글을 맨 앞에 추가
          total: oldData.total + 1,
        }
      })
    },
  })

  // 2. 게시글 수정
  const updateMutation = useMutation({
    mutationFn: updatePostApi,
    onSuccess: (updatedPost) => {
      queryClient.setQueriesData({ queryKey: ["postList"] }, (oldData: any) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          posts: oldData.posts.map((post: Post) => {
            if (post.id === updatedPost.id) {
              return {
                ...updatedPost,
                author: post.author,
              }
            }
            return post
          }),
        }
      })
    },
  })

  // 3. 게시글 삭제 (여기가 질문하신 부분!)
  const deleteMutation = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (deletedPost) => {
      // ❌ queryClient.invalidateQueries({ queryKey: ['posts'] }) -> 이 코드는 서버가 진짜일 때만 씀

      // ✅ 가짜 API 환경: 화면(Cache)에서 직접 필터링해서 없애버림
      queryClient.setQueriesData({ queryKey: ["postList"] }, (oldData: any) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          posts: oldData.posts.filter((post: Post) => post.id !== deletedPost.id),
          total: oldData.total - 1,
        }
      })
    },
  })

  return {
    addPost: addMutation.mutate,
    updatePost: updateMutation.mutate,
    deletePost: deleteMutation.mutate,
  }
}
