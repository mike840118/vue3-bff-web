export type PostListItem = { slug: string; title: string; summary: string }
export type PostDetail = { slug: string; title: string; content: string }

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json() as Promise<T>
}

export const BffApi = {
  health: () => apiGet<{ ok: boolean; service: string; time: string }>('/api/health'),
  posts: () => apiGet<PostListItem[]>('/api/posts'),
  post: (slug: string) => apiGet<PostDetail>(`/api/posts/${slug}`)
}
