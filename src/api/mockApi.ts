export interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  date: string;
}

const ITEMS_PER_PAGE = 10;
const TOTAL_ITEMS = 50;

function generatePosts(page: number): Post[] {
  const startId = (page - 1) * ITEMS_PER_PAGE + 1;
  const posts: Post[] = [];

  for (let i = 0; i < ITEMS_PER_PAGE; i++) {
    const id = startId + i;
    if (id > TOTAL_ITEMS) break;

    posts.push({
      id,
      title: `Post Title #${id}`,
      body: `This is the content of post number ${id}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      author: `Author ${Math.ceil(id / 5)}`,
      date: new Date(Date.now() - id * 86400000).toLocaleDateString(),
    });
  }

  return posts;
}

export async function fetchPosts(page: number): Promise<{
  posts: Post[];
  hasMore: boolean;
  totalPages: number;
}> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const posts = generatePosts(page);
  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  return {
    posts,
    hasMore: page < totalPages,
    totalPages,
  };
}
