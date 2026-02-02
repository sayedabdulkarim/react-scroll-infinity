import { useState, useCallback } from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { fetchPosts } from '../api/mockApi';
import type { Post } from '../api/mockApi';
import { PostCard } from './PostCard';

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    const result = await fetchPosts(page);
    setPosts((prev) => [...prev, ...result.posts]);
    setHasMore(result.hasMore);
    setPage((prev) => prev + 1);
  }, [page]);

  const { sentinelRef, isLoading, error } = useInfiniteScroll({
    loadMore,
    hasMore,
  });

  return (
    <div className="post-list">
      <h1 className="list-title">Infinite Scroll Demo</h1>
      <p className="list-subtitle">Scroll down to load more posts</p>

      <div className="posts-container">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Sentinel element - triggers loading when visible */}
      <div ref={sentinelRef} className="sentinel">
        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
            <span>Loading more posts...</span>
          </div>
        )}

        {error && (
          <div className="error">
            Error: {error.message}
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <div className="end-message">
            You've reached the end! ({posts.length} posts)
          </div>
        )}
      </div>
    </div>
  );
}
