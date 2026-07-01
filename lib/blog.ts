/**
 * Source unifiée pour les articles de blog.
 * Priorité : posts Supabase (status=published) + fallback mock.
 * Les articles auto-générés par blog_generator.py apparaissent dès leur publication.
 */

import { createClient } from "@supabase/supabase-js";
import { posts as mockPosts, type Post } from "@/data/posts-mock";

const DEFAULT_IMAGE = "https://picsum.photos/seed/kompar-edu/800/450";
const DEFAULT_CATEGORY = "Guides pratiques" as const;

function rowToPost(row: Record<string, unknown>): Post {
  return {
    slug: row.slug as string,
    title: row.title as string,
    excerpt: (row.excerpt as string) || "",
    date: ((row.created_at as string) || new Date().toISOString()).slice(0, 10),
    imageUrl: DEFAULT_IMAGE,
    category: DEFAULT_CATEGORY,
    content: (row.content as string) || "",
    source: "auto",
  };
}

export async function fetchAllPosts(): Promise<Post[]> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url?.trim() && key?.trim()) {
      const supabase = createClient(url, key);
      const { data } = await supabase
        .from("posts")
        .select("slug, title, excerpt, content, created_at, source_type")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      if (data && data.length > 0) {
        const dbPosts = data.map(rowToPost);
        const dbSlugs = new Set(dbPosts.map((p) => p.slug));
        const filteredMock = mockPosts.filter((p) => !dbSlugs.has(p.slug));
        return [...dbPosts, ...filteredMock];
      }
    }
  } catch {
    // Supabase indisponible → fallback mock
  }
  return mockPosts;
}

export async function fetchPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url?.trim() && key?.trim()) {
      const supabase = createClient(url, key);
      const { data } = await supabase
        .from("posts")
        .select("slug, title, excerpt, content, created_at, source_type")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (data) return rowToPost(data as Record<string, unknown>);
    }
  } catch {
    // Supabase indisponible → fallback mock
  }
  return mockPosts.find((p) => p.slug === slug);
}
