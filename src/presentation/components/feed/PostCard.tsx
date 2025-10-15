"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ThumbsUp,
  Heart,
  Laugh,
  Frown,
  Angry,
  MessageCircle,
  Share2,
  MapPin,
  Globe,
  Users,
  Lock,
} from "lucide-react";
import { Post, PostReaction } from "@/src/data/mock-posts";
import { useFeedStore } from "@/src/presentation/stores/feedStore";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { formatDistanceToNow } from "@/src/utils/date-helpers";
import { PostActionsMenu } from "./PostActionsMenu";

interface PostCardProps {
  post: Post;
}

const reactionIcons: Record<PostReaction["type"], { icon: React.ReactNode; color: string }> = {
  like: { icon: <ThumbsUp className="w-4 h-4" />, color: "text-blue-600" },
  love: { icon: <Heart className="w-4 h-4" />, color: "text-red-600" },
  haha: { icon: <Laugh className="w-4 h-4" />, color: "text-yellow-600" },
  wow: { icon: <div className="w-4 h-4 flex items-center justify-center font-bold text-yellow-600">😲</div>, color: "text-yellow-600" },
  sad: { icon: <Frown className="w-4 h-4" />, color: "text-yellow-600" },
  angry: { icon: <Angry className="w-4 h-4" />, color: "text-orange-600" },
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
  const { reactToPost, addComment, sharePost, deletePost, hidePost, savePost } = useFeedStore();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const userReaction = post.reactions.find((r) => r.userReacted);

  const handleReact = (type: PostReaction["type"]) => {
    reactToPost(post.id, type);
    setShowReactionPicker(false);
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
            onEdit={() => setIsEditing(true)}
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
        <div className="mt-4">
          <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      </div>

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className={`grid ${
          post.images.length === 1
            ? "grid-cols-1"
            : post.images.length === 2
            ? "grid-cols-2"
            : post.images.length === 3
            ? "grid-cols-3"
            : "grid-cols-2"
        } gap-1`}>
          {post.images.map((image, index) => (
            <div
              key={index}
              className={`relative ${
                post.images!.length === 3 && index === 0 ? "col-span-3" : ""
              } ${
                post.images!.length > 4 && index >= 3 ? "hidden" : ""
              }`}
              style={{ paddingBottom: post.images!.length === 1 ? "60%" : "100%" }}
            >
              <Image
                src={image}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
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
                  className={`w-5 h-5 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center ${reactionIcons[reaction.type].color}`}
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
          <div className="relative flex-1">
            <button
              onMouseEnter={() => setShowReactionPicker(true)}
              onMouseLeave={() => setShowReactionPicker(false)}
              onClick={() => handleReact("like")}
              className={`flex-1 w-full flex items-center justify-center space-x-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                userReaction ? reactionIcons[userReaction.type].color : "text-gray-600 dark:text-gray-400"
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
                  <ThumbsUp className="w-5 h-5" />
                  <span className="text-sm font-medium">ถูกใจ</span>
                </>
              )}
            </button>

            {/* Reaction Picker */}
            {showReactionPicker && (
              <div
                onMouseEnter={() => setShowReactionPicker(true)}
                onMouseLeave={() => setShowReactionPicker(false)}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white dark:bg-gray-700 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 p-2 flex space-x-2"
              >
                {(Object.keys(reactionIcons) as PostReaction["type"][]).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleReact(type)}
                    className={`p-2 hover:scale-125 transition-transform ${reactionIcons[type].color}`}
                  >
                    {reactionIcons[type].icon}
                  </button>
                ))}
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
                      <button className="hover:underline font-medium">ถูกใจ</button>
                      <button className="hover:underline font-medium">ตอบกลับ</button>
                      {comment.likes > 0 && (
                        <span className="flex items-center space-x-1">
                          <ThumbsUp className="w-3 h-3 text-blue-600" />
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
    </div>
  );
}
