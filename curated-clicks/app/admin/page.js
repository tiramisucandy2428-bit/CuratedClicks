"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addBlog,
  addProduct,
  deleteBlog,
  deleteProduct,
  getBlogs,
  getProducts,
  isAdminLoggedIn,
  logoutAdmin,
} from "@/app/lib/contentStore";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.replace("/admin/login");
      return;
    }
    setBlogs(getBlogs());
    setProducts(getProducts());
    setReady(true);
  }, [router]);

  const createBlog = (event) => {
    event.preventDefault();
    setBlogs(addBlog(blogTitle.trim(), blogExcerpt.trim()));
    setBlogTitle("");
    setBlogExcerpt("");
  };

  const createProduct = (event) => {
    event.preventDefault();
    setProducts(
      addProduct(
        productName.trim(),
        productDescription.trim(),
        productPrice.trim(),
        productUrl.trim(),
        productImageUrl.trim()
      )
    );
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductUrl("");
    setProductImageUrl("");
  };

  const signOut = () => {
    logoutAdmin();
    router.replace("/admin/login");
  };

  if (!ready) {
    return <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-300">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <button onClick={signOut} className="rounded-md border border-zinc-600 px-3 py-2 text-sm hover:bg-zinc-800">
            Logout
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
            <h2 className="text-lg font-semibold">Blogs</h2>
            <form onSubmit={createBlog} className="mt-3 space-y-3">
              <input
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
                placeholder="Blog title"
                value={blogTitle}
                onChange={(event) => setBlogTitle(event.target.value)}
                required
              />
              <textarea
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
                placeholder="Short excerpt"
                value={blogExcerpt}
                onChange={(event) => setBlogExcerpt(event.target.value)}
                required
              />
              <button className="rounded-md bg-amber-500 px-4 py-2 font-semibold text-zinc-950 hover:bg-amber-400">Add Blog</button>
            </form>

            <ul className="mt-4 space-y-2">
              {blogs.map((blog) => (
                <li key={blog.id} className="rounded-md border border-zinc-700 p-3">
                  <p className="font-semibold">{blog.title}</p>
                  <p className="mt-1 text-sm text-zinc-400">{blog.excerpt}</p>
                  <button
                    onClick={() => setBlogs(deleteBlog(blog.id))}
                    className="mt-2 text-sm text-rose-400 hover:text-rose-300"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
            <h2 className="text-lg font-semibold">Products</h2>
            <form onSubmit={createProduct} className="mt-3 space-y-3">
              <input
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
                placeholder="Product name"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                required
              />
              <textarea
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
                placeholder="Description"
                value={productDescription}
                onChange={(event) => setProductDescription(event.target.value)}
                required
              />
              <input
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
                placeholder="Price (e.g. $99)"
                value={productPrice}
                onChange={(event) => setProductPrice(event.target.value)}
                required
              />
              <input
                type="url"
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
                placeholder="Product link (https://...)"
                value={productUrl}
                onChange={(event) => setProductUrl(event.target.value)}
                required
              />
              <input
                type="url"
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
                placeholder="Image link (https://...)"
                value={productImageUrl}
                onChange={(event) => setProductImageUrl(event.target.value)}
                required
              />
              <button className="rounded-md bg-amber-500 px-4 py-2 font-semibold text-zinc-950 hover:bg-amber-400">
                Add Product
              </button>
            </form>

            <ul className="mt-4 space-y-2">
              {products.map((product) => (
                <li key={product.id} className="rounded-md border border-zinc-700 p-3">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="mb-2 h-24 w-full rounded-md object-cover" />
                  ) : null}
                  <p className="font-semibold">{product.name}</p>
                  <p className="mt-1 text-sm text-zinc-400">{product.description}</p>
                  <p className="mt-1 text-sm text-amber-300">{product.price}</p>
                  {product.productUrl ? (
                    <a
                      href={product.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm text-sky-300 hover:text-sky-200"
                    >
                      Open Product Link
                    </a>
                  ) : null}
                  <button
                    onClick={() => setProducts(deleteProduct(product.id))}
                    className="mt-2 text-sm text-rose-400 hover:text-rose-300"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
