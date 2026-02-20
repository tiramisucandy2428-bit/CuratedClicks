const CONTENT_KEY = "curated-clicks-content";
const ADMIN_SESSION_KEY = "curated-clicks-admin-session";

const DEFAULT_CONTENT = {
  blogs: [
    { id: "b-1", title: "Welcome to Curated Clicks", excerpt: "Fresh updates and curated stories live here." },
  ],
  products: [
    { id: "p-1", name: "Starter Product", description: "A featured product slot for your launch.", price: "$49" },
  ],
};

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "curated123";

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
    return {
      blogs: Array.isArray(parsed.blogs) ? parsed.blogs : DEFAULT_CONTENT.blogs,
      products: Array.isArray(parsed.products) ? parsed.products : DEFAULT_CONTENT.products,
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
  content.blogs = [
    {
      id: `b-${Date.now()}`,
      title,
      excerpt,
    },
    ...content.blogs,
  ];
  writeContent(content);
  return content.blogs;
}

export function addProduct(name, description, price) {
  const content = readContent();
  content.products = [
    {
      id: `p-${Date.now()}`,
      name,
      description,
      price,
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

export function deleteProduct(id) {
  const content = readContent();
  content.products = content.products.filter((product) => product.id !== id);
  writeContent(content);
  return content.products;
}

export function loginAdmin(username, password) {
  if (!hasWindow()) return false;
  const valid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  if (valid) {
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  }
  return valid;
}

export function isAdminLoggedIn() {
  if (!hasWindow()) return false;
  return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function logoutAdmin() {
  if (!hasWindow()) return;
  window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
