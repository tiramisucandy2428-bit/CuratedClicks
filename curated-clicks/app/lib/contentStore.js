const CONTENT_KEY = "curated-clicks-content";

export const BLOG_CATEGORIES = ["Home Decors", "Gaming", "AI tools", "Seasonal"];

const DEFAULT_CONTENT = {
  blogs: [
    {
      id: "b-1",
      title: "Welcome to Curated Clicks",
      excerpt: "Fresh updates and curated stories live here.",
      category: "Seasonal",
      pinned: false,
      createdAt: 1739980800000,
    },
  ],
  products: [],
};

function hasWindow() {
  return typeof window !== "undefined";
}

function readContent() {
  if (!hasWindow()) return DEFAULT_CONTENT;

  const raw = window.localStorage.getItem(CONTENT_KEY);
  if (!raw) {
    window.localStorage.setItem(CONTENT_KEY, JSON.stringify(DEFAULT_CONTENT));
    return DEFAULT_CONTENT;
  }

  try {
    const parsed = JSON.parse(raw);
    const normalizedBlogs = Array.isArray(parsed.blogs)
      ? parsed.blogs.map((blog) => ({
          ...blog,
          category: BLOG_CATEGORIES.includes(blog.category) ? blog.category : "Seasonal",
          pinned: Boolean(blog.pinned),
          createdAt: Number(blog.createdAt) || Number(blog.id?.replace("b-", "")) || Date.now(),
        }))
      : DEFAULT_CONTENT.blogs;

    const normalizedProducts = Array.isArray(parsed.products)
      ? parsed.products.map((product) => ({
          ...product,
          productUrl: product.productUrl || "",
          imageUrl: product.imageUrl || "",
        })).filter((product) => product.id !== "p-1")
      : DEFAULT_CONTENT.products;

    return {
      blogs: normalizedBlogs,
      products: normalizedProducts,
    };
  } catch {
    window.localStorage.setItem(CONTENT_KEY, JSON.stringify(DEFAULT_CONTENT));
    return DEFAULT_CONTENT;
  }
}

function writeContent(content) {
  if (!hasWindow()) return;
  window.localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event("curated-clicks-content-updated"));
}

export function getBlogs() {
  return readContent().blogs;
}

export function getProducts() {
  return readContent().products;
}

export function addBlog(title, excerpt) {
  const content = readContent();
  const createdAt = Date.now();
  content.blogs = [
    {
      id: `b-${createdAt}`,
      title,
      excerpt,
      category: "Seasonal",
      pinned: false,
      createdAt,
    },
    ...content.blogs,
  ];
  writeContent(content);
  return content.blogs;
}

export function addBlogWithMeta(title, excerpt, category, pinned) {
  const content = readContent();
  const createdAt = Date.now();
  content.blogs = [
    {
      id: `b-${createdAt}`,
      title,
      excerpt,
      category: BLOG_CATEGORIES.includes(category) ? category : "Seasonal",
      pinned: Boolean(pinned),
      createdAt,
    },
    ...content.blogs,
  ];
  writeContent(content);
  return content.blogs;
}

export function addProduct(name, description, price, productUrl, imageUrl) {
  const content = readContent();
  content.products = [
    {
      id: `p-${Date.now()}`,
      name,
      description,
      price,
      productUrl,
      imageUrl,
    },
    ...content.products,
  ];
  writeContent(content);
  return content.products;
}

export function deleteBlog(id) {
  const content = readContent();
  content.blogs = content.blogs.filter((blog) => blog.id !== id);
  writeContent(content);
  return content.blogs;
}

export function toggleBlogPin(id) {
  const content = readContent();
  content.blogs = content.blogs.map((blog) =>
    blog.id === id
      ? {
          ...blog,
          pinned: !blog.pinned,
        }
      : blog
  );
  writeContent(content);
  return content.blogs;
}

export function deleteProduct(id) {
  const content = readContent();
  content.products = content.products.filter((product) => product.id !== id);
  writeContent(content);
  return content.products;
}
