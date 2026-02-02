# react-scroll-infinity

A performant React hook for infinite scrolling using the Intersection Observer API.

## Features

- **Performant** - Uses Intersection Observer (no scroll event listeners)
- **Lightweight** - ~1KB minified
- **TypeScript** - Full type support
- **Configurable** - Customize threshold and root margin
- **Zero dependencies** - Only requires React as peer dependency

## Installation

```bash
npm install react-scroll-infinity
```

```bash
yarn add react-scroll-infinity
```

```bash
pnpm add react-scroll-infinity
```

## Usage

```tsx
import { useInfiniteScroll } from 'react-scroll-infinity';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    const newPosts = await fetchPosts(page);
    setPosts(prev => [...prev, ...newPosts]);
    setHasMore(newPosts.length > 0);
    setPage(prev => prev + 1);
  };

  const { sentinelRef, isLoading, error } = useInfiniteScroll({
    loadMore,
    hasMore,
  });

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Sentinel element - triggers loading when visible */}
      <div ref={sentinelRef}>
        {isLoading && <span>Loading...</span>}
        {error && <span>Error: {error.message}</span>}
        {!hasMore && <span>No more posts</span>}
      </div>
    </div>
  );
}
```

## API

### useInfiniteScroll(options)

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `loadMore` | `() => Promise<void>` | required | Function to load more data |
| `hasMore` | `boolean` | required | Whether more data is available |
| `threshold` | `number` | `0.1` | Intersection Observer threshold (0-1) |
| `rootMargin` | `string` | `'100px'` | Margin around the root |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `sentinelRef` | `RefObject<HTMLDivElement>` | Ref to attach to sentinel element |
| `isLoading` | `boolean` | Loading state |
| `error` | `Error \| null` | Error state |

## Advanced Usage

### Custom Threshold & Root Margin

```tsx
const { sentinelRef, isLoading } = useInfiniteScroll({
  loadMore,
  hasMore,
  threshold: 0.5,      // Trigger when 50% visible
  rootMargin: '200px', // Start loading 200px before visible
});
```

### With Container Scroll

The hook works with both window scroll and container scroll. Just place the sentinel element inside your scrollable container.

```tsx
<div style={{ height: '500px', overflow: 'auto' }}>
  {items.map(item => <Item key={item.id} {...item} />)}
  <div ref={sentinelRef} />
</div>
```

## TypeScript

Full TypeScript support with exported types:

```tsx
import {
  useInfiniteScroll,
  UseInfiniteScrollOptions,
  UseInfiniteScrollReturn
} from 'react-scroll-infinity';
```

## Browser Support

Works in all browsers that support [Intersection Observer API](https://caniuse.com/intersectionobserver) (95%+ global support).

## License

MIT
