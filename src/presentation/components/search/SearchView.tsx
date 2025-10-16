"use client";

import { SearchViewModel } from "@/src/presentation/presenters/search/SearchPresenter";
import { useSearchPresenter } from "@/src/presentation/presenters/search/useSearchPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { FileText, Search, Users, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchViewProps {
  initialViewModel?: SearchViewModel;
}

/**
 * Search View Component
 * หน้าค้นหา
 */
export function SearchView({ initialViewModel }: SearchViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();
  const [state, actions] = useSearchPresenter(initialViewModel);

  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
  }, [isAuthenticated, router]);

  // Perform search when URL param changes
  useEffect(() => {
    const query = searchParams.get("q");
    console.log("Search params changed", query);
    if (query) {
      setSearchInput(query);
      actions.search(query);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleClear = () => {
    setSearchInput("");
    actions.clearSearch();
    router.push("/search");
  };

  const users = state.viewModel?.results.users || [];
  const posts = state.viewModel?.results.posts || [];
  const totalResults = state.viewModel?.totalResults || 0;
  const query = state.viewModel?.query || "";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Search Box */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ค้นหาผู้ใช้, โพสต์..."
                className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              ค้นหา
            </button>
          </form>
        </div>

        {/* Loading state */}
        {state.loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">กำลังค้นหา...</p>
          </div>
        )}

        {/* Error state */}
        {state.error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-300">{state.error}</p>
          </div>
        )}

        {/* Results */}
        {!state.loading && query && (
          <>
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                ผลการค้นหาสำหรับ &ldquo;{query}&rdquo;
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                พบ {totalResults} ผลลัพธ์
              </p>
            </div>

            {/* Users Results */}
            {users.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Users className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    ผู้ใช้ ({users.length})
                  </h3>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <Link
                      key={user.id}
                      href={`/profile/${user.id}`}
                      className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-4">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                          {user.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {user.bio || user.email}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Posts Results */}
            {posts.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    โพสต์ ({posts.length})
                  </h3>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md divide-y divide-gray-200 dark:divide-gray-700">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-start mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-3">
                          {post.userName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/profile/${post.userId}`}
                            className="font-semibold text-gray-900 dark:text-white hover:underline"
                          >
                            {post.userName}
                          </Link>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString(
                              "th-TH"
                            )}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                        {post.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {totalResults === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
                <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  ไม่พบผลลัพธ์
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  ลองค้นหาด้วยคำค้นอื่น
                </p>
              </div>
            )}
          </>
        )}

        {/* Empty state (no search yet) */}
        {!state.loading && !query && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              เริ่มค้นหา
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              ค้นหาผู้ใช้และโพสต์บน Next Link
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
