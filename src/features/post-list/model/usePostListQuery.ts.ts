import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { usePostListStore } from "./store"
import { getPosts, searchPosts, getPostsByTag } from "@/entities/post/api"
import { getUsers } from "@/entities/user/api"
import { Post } from "@/entities/post/model/types"

export const usePostListQuery = () => {
  const { skip, limit, searchQuery, selectedTag, sortBy, sortOrder } = usePostListStore()

  return useQuery({
    // 모든 상태가 키에 포함되어야 함
    queryKey: ["postList", { skip, limit, searchQuery, selectedTag, sortBy, sortOrder }],

    queryFn: async () => {
      let postsData: { posts: Post[]; total: number }

      if (searchQuery) {
        postsData = await searchPosts(searchQuery, limit, skip, sortBy, sortOrder)
      } else if (selectedTag && selectedTag !== "all") {
        postsData = await getPostsByTag(selectedTag, limit, skip, sortBy, sortOrder)
      } else {
        postsData = await getPosts(limit, skip, sortBy, sortOrder)
      }

      // 유저 정보 매핑 (Join)
      const usersData = await getUsers()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      return {
        posts: postsWithUsers,
        total: postsData.total,
      }
    },
    placeholderData: keepPreviousData,
    staleTime: 5000,
  })
}
