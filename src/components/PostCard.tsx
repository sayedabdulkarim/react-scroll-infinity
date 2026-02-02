import type { Post } from '../api/mockApi';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-body">{post.body}</p>
      <div className="post-meta">
        <span className="post-author">{post.author}</span>
        <span className="post-date">{post.date}</span>
      </div>
    </article>
  );
}
