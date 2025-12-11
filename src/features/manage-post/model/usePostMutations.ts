import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPostApi, updatePostApi, deletePostApi } from "@/entities/post/api"

export const usePostMutations = () => {
  const queryClient = useQueryClient()

  // 1. 게시글 추가
  const addMutation = useMutation({
    mutationFn: addPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] })
    },
  })

  // 2. 게시글 수정
  const updateMutation = useMutation({
    mutationFn: updatePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] })
      queryClient.invalidateQueries({ queryKey: ["postDetail"] })
    },
  })

  // 3. 게시글 삭제
  const deleteMutation = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] })
    },
  })

  return {
    addPost: addMutation.mutate,
    updatePost: updateMutation.mutate,
    deletePost: deleteMutation.mutate,
  }
}
