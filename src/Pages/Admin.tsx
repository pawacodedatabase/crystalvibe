import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../Pages/products/product";
import AdminBlog from "./components/Blog/adminBlog";

const BIN_ID = "68468e468960c979a5a6e612";
const API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB.";
const CLOUD_NAME = "dunczn7o7";
const UPLOAD_PRESET = "luxxbukola";

const headers = {
  "X-Master-Key": API_KEY,
  "Content-Type": "application/json",
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    subCategories: [],
    price: undefined ,
    originalPrice: undefined,
    isOnSale: false,
    description: "",
    images: [],
    sizes: [],
    colors: [],
   
  });
  const [uploading, setUploading] = useState(false);

  const fetchProducts = async () => {
    const res = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, { headers });
    setProducts(res.data.record);
  };

  const updateProducts = async (updated: Product[]) => {
    await axios.put(`https://api.jsonbin.io/v3/b/${BIN_ID}`, updated, { headers });
    fetchProducts();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId !== null) {
      const updated = products.map((p) => p.id === editingId ? { ...form, id: editingId } : p);
      updateProducts(updated);
      setEditingId(null);
    } else {
      const newProduct: Product = {
        id: Date.now(),
        ...form,
      };
      updateProducts([...products, newProduct]);
    }

    resetForm();
  };

  const handleDelete = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    updateProducts(updated);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({ ...product });
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      subCategories: [],
      price: undefined,
      originalPrice: undefined,
      isOnSale: false,
      description: "",
      images: [],
      sizes: [],
      colors: [],
    });
  };
  // const handleArrayInput = (value: string) => {
  //   console.log("Input Value:", value); // Check the input value
  //   return value.split(",").map((v) => v.trim()).filter((v) => v);
  // };




 


  const removeImage = (index: number) => {
    const updatedImages = [...form.images];
    updatedImages.splice(index, 1);
    setForm({ ...form, images: updatedImages });
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    setUploading(true);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      const imageUrl = res.data.secure_url;
      setForm((prevForm) => ({
        ...prevForm,
        images: [...prevForm.images, imageUrl],
      }));
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* PRODUCT FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg bg-white shadow mb-10">
       
       <label htmlFor="">Product Name</label> <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full rounded "
        />
        <br /> <br />

        <label htmlFor="">Product Category</label>
<select
  value={form.category}
  onChange={(e) => setForm({ ...form, category: e.target.value })}
  className="border p-2 w-full rounded"
>
  <option value="">-- Select Category --</option>
  <option value="Bag">Bag</option>
  <option value="Shoe">Shoe</option>
  <option value="Clothes">Cloth</option>
</select>


{/* <label htmlFor="">Sub Category (Optional) </label>
        <input
          type="text"
          placeholder="Subcategories (comma separated)"
          value={form.subCategories.join(", ")}
          onChange={(e) =>
            setForm({ ...form, subCategories: handleArrayInput(e.target.value) })
          }
          className="border p-2 w-full rounded"
        /> */}

<label htmlFor="">Product Description</label>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full rounded"
        />

<label htmlFor="">Product Price</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: +e.target.value })}
            className="border p-2 rounded w-1/2"
          />


          <input
            type="number"
            placeholder="Onsale Price"
            value={form.originalPrice ?? ""}
            onChange={(e) => setForm({ ...form, originalPrice: +e.target.value })}
            className="border p-2 rounded w-1/2"
          />
        </div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.isOnSale}
            onChange={(e) => setForm({ ...form, isOnSale: e.target.checked })}
          />
          <span>Is On Sale?</span>
        </label>
        {/* <input
          type="text"
          placeholder="Sizes (comma separated)"
          value={form.sizes?.join(", ") || ""}
          onChange={(e) => setForm({ ...form, sizes: handleArrayInput(e.target.value) })}
          className="border p-2 w-full rounded"
        /> */}




        {/* <input
          type="text"
          placeholder="Colors (comma separated)"
          value={form.colors?.join(", ") || ""}
          onChange={(e) => setForm({ ...form, colors: handleArrayInput(e.target.value) })}
          className="border p-2 w-full rounded"
        /> */}

        {/* IMAGES LIST */}
        <div>
          <p className="font-semibold mb-2">Images</p>
          <div className="flex flex-wrap gap-4 mb-2">
            {form.images.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} alt="preview" className="w-24 h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                uploadImage(e.target.files[0]);
              }
            }}
            className="border p-2 w-full rounded"
          />
          {uploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* PRODUCTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow p-4 space-y-2">
            <div className="flex items-center gap-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="font-bold text-blue-600">N{product.price}</p>
                {product.originalPrice && (
                  <p className="text-sm line-through text-gray-400">N{product.originalPrice}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="px-3 py-1 bg-yellow-400 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <AdminBlog/>
    </>
  );
}
