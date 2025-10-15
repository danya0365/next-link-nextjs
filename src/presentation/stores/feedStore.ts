/**
 * Feed Store
 * Zustand store for managing news feed posts
 */

import { create } from "zustand";
import { Post, PostReaction, PostComment, mockPosts } from "@/src/data/mock-posts";

interface FeedState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

interface FeedActions {
  loadPosts: () => Promise<void>;
  addPost: (post: Omit<Post, "id" | "createdAt" | "reactions" | "totalReactions" | "comments" | "totalComments" | "shares">) => void;
  updatePost: (postId: string, updates: Partial<Pick<Post, "content" | "privacy" | "feeling" | "location">>) => void;
  deletePost: (postId: string) => void;
  hidePost: (postId: string) => void;
  savePost: (postId: string) => void;
  reactToPost: (postId: string, reactionType: PostReaction["type"]) => void;
  addComment: (postId: string, comment: Omit<PostComment, "id" | "createdAt" | "likes">) => void;
  deleteComment: (postId: string, commentId: string) => void;
  likeComment: (postId: string, commentId: string) => void;
  sharePost: (postId: string) => void;
}

export type FeedStore = FeedState & FeedActions;

/**
 * Feed Store
 */
export const useFeedStore = create<FeedStore>((set, get) => ({
  // State
  posts: [],
  isLoading: false,
  error: null,

  // Actions
  loadPosts: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Load mock posts
      set({
        posts: mockPosts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to load posts",
        isLoading: false,
      });
    }
  },

  addPost: (postData) => {
    const { posts } = get();
    
    const newPost: Post = {
      ...postData,
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString(),
      reactions: [],
      totalReactions: 0,
      comments: [],
      totalComments: 0,
      shares: 0,
    };

    set({
      posts: [newPost, ...posts],
    });
  },

  updatePost: (postId, updates) => {
    const { posts } = get();
    set({
      posts: posts.map((post) =>
        post.id === postId ? { ...post, ...updates } : post
      ),
    });
  },

  deletePost: (postId) => {
    const { posts } = get();
    set({
      posts: posts.filter((post) => post.id !== postId),
    });
  },

  hidePost: (postId) => {
    const { posts } = get();
    // In a real app, this would mark the post as hidden for the user
    set({
      posts: posts.filter((post) => post.id !== postId),
    });
  },

  savePost: (postId) => {
    // In a real app, this would add the post to user's saved posts
    console.log("Post saved:", postId);
    alert("บันทึกโพสต์แล้ว!");
  },

  reactToPost: (postId, reactionType) => {
    const { posts } = get();
    
    set({
      posts: posts.map((post) => {
        if (post.id !== postId) return post;

        // Check if user already reacted with this type
        const existingReaction = post.reactions.find((r) => r.type === reactionType);
        const userAlreadyReacted = post.reactions.some((r) => r.userReacted);

        let updatedReactions: PostReaction[];
        let totalReactions = post.totalReactions;

        if (existingReaction && existingReaction.userReacted) {
          // Remove reaction
          updatedReactions = post.reactions.map((r) =>
            r.type === reactionType
              ? { ...r, count: r.count - 1, userReacted: false }
              : r
          ).filter((r) => r.count > 0);
          totalReactions--;
        } else {
          // Remove old reaction if exists and add new one
          if (userAlreadyReacted) {
            updatedReactions = post.reactions.map((r) =>
              r.userReacted
                ? { ...r, count: r.count - 1, userReacted: false }
                : r
            ).filter((r) => r.count > 0);
          } else {
            updatedReactions = [...post.reactions];
            totalReactions++;
          }

          // Add new reaction
          const reactionIndex = updatedReactions.findIndex((r) => r.type === reactionType);
          if (reactionIndex >= 0) {
            updatedReactions[reactionIndex] = {
              ...updatedReactions[reactionIndex],
              count: updatedReactions[reactionIndex].count + 1,
              userReacted: true,
            };
          } else {
            updatedReactions.push({ type: reactionType, count: 1, userReacted: true });
          }
        }

        return {
          ...post,
          reactions: updatedReactions,
          totalReactions,
        };
      }),
    });
  },

  addComment: (postId, commentData) => {
    const { posts } = get();

    const newComment: PostComment = {
      ...commentData,
      id: `comment-${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    set({
      posts: posts.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          comments: [...post.comments, newComment],
          totalComments: post.totalComments + 1,
        };
      }),
    });
  },

  deleteComment: (postId, commentId) => {
    const { posts } = get();

    set({
      posts: posts.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          comments: post.comments.filter((comment) => comment.id !== commentId),
          totalComments: post.totalComments - 1,
        };
      }),
    });
  },

  likeComment: (postId, commentId) => {
    const { posts } = get();

    set({
      posts: posts.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, likes: comment.likes + 1 }
              : comment
          ),
        };
      }),
    });
  },

  sharePost: (postId) => {
    const { posts } = get();

    set({
      posts: posts.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      ),
    });
  },
}));
