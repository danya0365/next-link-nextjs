"use client";

import { Post, PostReaction } from "@/src/data/mock-posts";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useFeedStore } from "@/src/presentation/stores/feedStore";
import { formatDistanceToNow } from "@/src/utils/date-helpers";
import {
  Globe,
  Lock,
  MapPin,
  MessageCircle,
  Share2,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PostActionsMenu } from "./PostActionsMenu";

interface PostCardProps {
  post: Post;
}

const reactionIcons: Record<
  PostReaction["type"],
  { icon: React.ReactNode; color: string }
> = {
  like: {
    icon: <div className="w-4 h-4 flex items-center justify-center">👍</div>,
    color: "text-blue-600",
  },
  love: {
    icon: <div className="w-4 h-4 flex items-center justify-center">❤️</div>,
    color: "text-red-600",
  },
  haha: {
    icon: <div className="w-4 h-4 flex items-center justify-center">😂</div>,
    color: "text-yellow-600",
  },
  wow: {
    icon: <div className="w-4 h-4 flex items-center justify-center">😲</div>,
    color: "text-yellow-600",
  },
  sad: {
    icon: <div className="w-4 h-4 flex items-center justify-center">😢</div>,
    color: "text-yellow-600",
  },
  angry: {
    icon: <div className="w-4 h-4 flex items-center justify-center">😠</div>,
    color: "text-orange-600",
  },
};

const privacyIcons = {
  public: <Globe className="w-3 h-3" />,
  friends: <Users className="w-3 h-3" />,
  only_me: <Lock className="w-3 h-3" />,
};

/**
 * Post Card Component
 * แสดงโพสต์แต่ละรายการ
 */
export function PostCard({ post }: PostCardProps) {
  const { user } = useAuthStore();
  const { reactToPost, addComment, sharePost, deletePost, hidePost, savePost } =
    useFeedStore();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const reactionPickerRef = useRef<HTMLDivElement | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!showReactionPicker) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        reactionPickerRef.current &&
        !reactionPickerRef.current.contains(event.target as Node)
      ) {
        setShowReactionPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showReactionPicker]);

  const userReaction = post.reactions.find((r) => r.userReacted);

  const handleReact = (type: PostReaction["type"]) => {
    reactToPost(post.id, type);
    setShowReactionPicker(false);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrevImage = () => {
    if (!post.images || lightboxIndex === null) return;
    setLightboxIndex((prevIndex) => {
      if (prevIndex === null) return prevIndex;
      const newIndex =
        (prevIndex - 1 + post.images!.length) % post.images!.length;
      return newIndex;
    });
  };

  const showNextImage = () => {
    if (!post.images || lightboxIndex === null) return;
    setLightboxIndex((prevIndex) => {
      if (prevIndex === null) return prevIndex;
      const newIndex = (prevIndex + 1) % post.images!.length;
      return newIndex;
    });
  };

  const handleComment = () => {
    if (!commentText.trim() || !user) return;

    addComment(post.id, {
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar || "https://i.pravatar.cc/150?img=1",
      content: commentText.trim(),
    });

    setCommentText("");
  };

  const handleShare = () => {
    sharePost(post.id);
    alert("แชร์โพสต์แล้ว!");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={post.userAvatar}
              alt={post.userName}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {post.userName}
                </h3>
                {post.feeling && (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    รู้สึก{post.feeling}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{formatDistanceToNow(post.createdAt)}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  {privacyIcons[post.privacy]}
                </div>
                {post.location && (
                  <>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{post.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <PostActionsMenu
            postId={post.id}
            postUserId={post.userId}
            onEdit={() => alert("แก้ไขโพสต์")}
            onDelete={() => {
              if (confirm("คุณต้องการลบโพสต์นี้หรือไม่?")) {
                deletePost(post.id);
              }
            }}
            onSave={() => savePost(post.id)}
            onHide={() => {
              if (confirm("คุณต้องการซ่อนโพสต์นี้หรือไม่?")) {
                hidePost(post.id);
              }
            }}
            onReport={() => alert("รายงานโพสต์")}
          />
        </div>

        {/* Post Content */}
        <Link href={`/post/${post.id}`}>
          <div className="mt-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg p-2 -m-2 transition-colors">
            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        </Link>
      </div>

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div
          className={`grid cursor-pointer ${
            post.images.length === 1
              ? "grid-cols-1"
              : post.images.length === 2
              ? "grid-cols-2"
              : post.images.length === 3
              ? "grid-cols-3"
              : "grid-cols-2"
          } gap-1`}
        >
          {post.images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                post.images!.length === 3 && index === 0 ? "col-span-3" : ""
              } ${post.images!.length > 4 && index >= 3 ? "hidden" : ""}`}
              style={{
                paddingBottom: post.images!.length === 1 ? "60%" : "100%",
              }}
            >
              <Image
                src={image}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover hover:opacity-95 transition-opacity"
              />
            </button>
          ))}
        </div>
      )}

      {/* Reaction Summary */}
      {post.totalReactions > 0 && (
        <div className="px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              {post.reactions.slice(0, 3).map((reaction) => (
                <div
                  key={reaction.type}
                  className={`w-5 h-5 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center ${
                    reactionIcons[reaction.type].color
                  }`}
                >
                  {reactionIcons[reaction.type].icon}
                </div>
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              {post.totalReactions}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
            {post.totalComments > 0 && (
              <button
                onClick={() => setShowComments(!showComments)}
                className="hover:underline"
              >
                {post.totalComments} ความคิดเห็น
              </button>
            )}
            {post.shares > 0 && <span>{post.shares} การแชร์</span>}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex items-center justify-around">
          {/* Like Button with Reaction Picker */}
          <div ref={reactionPickerRef} className="relative flex-1">
            <button
              onMouseEnter={() => setShowReactionPicker(true)}
              onClick={(event) => {
                event.preventDefault();
                setShowReactionPicker((prev) => !prev);
              }}
              className={`flex-1 w-full flex items-center justify-center space-x-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                userReaction
                  ? reactionIcons[userReaction.type].color
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {userReaction ? (
                <>
                  {reactionIcons[userReaction.type].icon}
                  <span className="text-sm font-medium capitalize">
                    {userReaction.type === "like" ? "ถูกใจ" : userReaction.type}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 flex items-center justify-center">
                    👍
                  </div>
                  <span className="text-sm font-medium">ถูกใจ</span>
                </>
              )}
            </button>

            {/* Reaction Picker */}
            {showReactionPicker && (
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white dark:bg-gray-700 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 p-2 flex space-x-2"
              >
                {(Object.keys(reactionIcons) as PostReaction["type"][]).map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => handleReact(type)}
                      className={`p-2 hover:scale-125 transition-transform ${reactionIcons[type].color}`}
                    >
                      {reactionIcons[type].icon}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">แสดงความคิดเห็น</span>
          </button>

          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">แชร์</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
          {/* Existing Comments */}
          {post.comments.length > 0 && (
            <div className="space-y-3 mb-3">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-2">
                  <Image
                    src={comment.userAvatar}
                    alt={comment.userName}
                    width={32}
                    height={32}
                    className="rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                        {comment.userName}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {comment.content}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 ml-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatDistanceToNow(comment.createdAt)}</span>
                      <button className="hover:underline font-medium">
                        ถูกใจ
                      </button>
                      <button className="hover:underline font-medium">
                        ตอบกลับ
                      </button>
                      {comment.likes > 0 && (
                        <span className="flex items-center space-x-1">
                          <div className="w-3 h-3 flex items-center justify-center">
                            👍
                          </div>
                          <span>{comment.likes}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment Input */}
          {user && (
            <div className="flex space-x-2">
              <Image
                src={user.avatar || "https://i.pravatar.cc/150?img=1"}
                alt={user.name}
                width={32}
                height={32}
                className="rounded-full flex-shrink-0"
              />
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleComment()}
                  placeholder="เขียนความคิดเห็น..."
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  โพสต์
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lightbox */}
      {post.images && lightboxIndex !== null && post.images[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeLightbox}
        >
          <div
            className="relative z-10 max-w-4xl w-full px-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <Image
                src={post.images[lightboxIndex]}
                alt={`Post image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 90vw, 60vw"
              />
            </div>
            {post.images.length > 1 && (
              <div className="absolute inset-y-1/2 left-0 right-0 flex items-center justify-between px-4 -translate-y-1/2">
                <button
                  type="button"
                  onClick={showPrevImage}
                  className="bg-gray-900/70 text-white px-3 py-2 rounded-full hover:bg-gray-900/90"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  className="bg-gray-900/70 text-white px-3 py-2 rounded-full hover:bg-gray-900/90"
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-8 bg-gray-900/70 text-white px-4 py-2 rounded-full hover:bg-gray-900/90"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
