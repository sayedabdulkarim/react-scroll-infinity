import { useEffect, useRef, useState, useCallback } from 'react';

export interface UseInfiniteScrollOptions {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  threshold?: number;
  rootMargin?: string;
}

export interface UseInfiniteScrollReturn {
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  error: Error | null;
}

export function useInfiniteScroll({
  loadMore,
  hasMore,
  threshold = 0.1,
  rootMargin = '100px',
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleLoadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      await loadMore();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load more'));
    } finally {
      setIsLoading(false);
    }
  }, [loadMore, hasMore, isLoading]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          handleLoadMore();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [handleLoadMore, hasMore, isLoading, threshold, rootMargin]);

  return {
    sentinelRef,
    isLoading,
    error,
  };
}
