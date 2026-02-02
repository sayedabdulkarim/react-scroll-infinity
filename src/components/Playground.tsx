import { useState, useCallback } from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { fetchPosts } from '../api/mockApi';
import type { Post } from '../api/mockApi';
import { PostCard } from './PostCard';

export function Playground() {
  // Playground controls
  const [threshold, setThreshold] = useState(0.1);
  const [rootMargin, setRootMargin] = useState('100');

  // Data state
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
    threshold,
    rootMargin: `${rootMargin}px`,
  });

  const handleReset = () => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className="playground">
      <div className="playground-header">
        <h1>useInfiniteScroll Playground</h1>
        <p className="playground-subtitle">Adjust settings and see the hook in action</p>
      </div>

      {/* Controls Panel */}
      <div className="controls-panel">
        <div className="control-group">
          <label htmlFor="threshold">
            Threshold: <strong>{threshold}</strong>
          </label>
          <input
            id="threshold"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
          />
          <span className="control-hint">0 = edge visible, 1 = fully visible</span>
        </div>

        <div className="control-group">
          <label htmlFor="rootMargin">
            Root Margin: <strong>{rootMargin}px</strong>
          </label>
          <input
            id="rootMargin"
            type="range"
            min="0"
            max="500"
            step="50"
            value={rootMargin}
            onChange={(e) => setRootMargin(e.target.value)}
          />
          <span className="control-hint">Triggers loading before element is visible</span>
        </div>

        <button className="reset-btn" onClick={handleReset}>
          Reset List
        </button>
      </div>

      {/* Hook State Display */}
      <div className="hook-state">
        <div className="state-item">
          <span className="state-label">isLoading:</span>
          <span className={`state-value ${isLoading ? 'active' : ''}`}>
            {isLoading ? 'true' : 'false'}
          </span>
        </div>
        <div className="state-item">
          <span className="state-label">hasMore:</span>
          <span className={`state-value ${hasMore ? 'active' : ''}`}>
            {hasMore ? 'true' : 'false'}
          </span>
        </div>
        <div className="state-item">
          <span className="state-label">Posts loaded:</span>
          <span className="state-value">{posts.length}</span>
        </div>
        <div className="state-item">
          <span className="state-label">Current page:</span>
          <span className="state-value">{page}</span>
        </div>
      </div>

      {/* Code Preview */}
      <div className="code-preview">
        <pre>{`const { sentinelRef, isLoading, error } = useInfiniteScroll({
  loadMore,
  hasMore,
  threshold: ${threshold},
  rootMargin: '${rootMargin}px',
});`}</pre>
      </div>

      {/* Posts List */}
      <div className="posts-container">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Sentinel */}
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

        {posts.length === 0 && !isLoading && (
          <div className="start-message">
            Scroll down to start loading posts...
          </div>
        )}
      </div>
    </div>
  );
}
