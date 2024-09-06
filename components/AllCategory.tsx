import React, { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  category_id: number;
  category_name: string;
  decription: string;
  status: string;
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({
    category_id: 0,
    category_name: "",
    decription: "",
    status: "active",
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ API", error);
    }
  };

  const handleAddOrUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3001/category/${newCategory.category_id}`,
          newCategory
        );
      } else {
        await axios.post("http://localhost:3001/category", {
          ...newCategory,
          category_id: Math.ceil(Math.random() * 9999999999),
        });
      }
      fetchCategories();
      resetForm();
    } catch (error) {
      console.error("Lỗi khi thêm/sửa danh mục", error);
    }
  };

  const resetForm = () => {
    setNewCategory({
      category_id: 0,
      category_name: "",
      decription: "",
      status: "active",
    });
    setEditMode(false);
  };

  const handleDeleteCategory = async (category_id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/category/${category_id}`);
        fetchCategories();
      } catch (error) {
        console.error("Lỗi khi xóa danh mục", error);
      }
    }
  };

  const handleEditCategory = (category: Category) => {
    setNewCategory(category);
    setEditMode(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý danh mục</h2>

      {/* Form thêm/sửa danh mục */}
      <form onSubmit={handleAddOrUpdateCategory} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700">Tên danh mục</label>
          <input
            type="text"
            value={newCategory.category_name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, category_name: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nội dung</label>
          <input
            type="text"
            value={newCategory.decription}
            onChange={(e) =>
              setNewCategory({ ...newCategory, decription: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Trạng thái</label>
          <select
            value={newCategory.status}
            onChange={(e) =>
              setNewCategory({ ...newCategory, status: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {editMode ? "Cập nhật" : "Thêm mới"}
        </button>
      </form>

      {/* Bảng danh mục */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Tên danh mục</th>
            <th className="px-4 py-2 border">Nội dung</th>
            <th className="px-4 py-2 border">Trạng thái</th>
            <th className="px-4 py-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.category_id}>
              <td className="px-4 py-2 border">{category.category_id}</td>
              <td className="px-4 py-2 border">{category.category_name}</td>
              <td className="px-4 py-2 border">{category.decription}</td>
              <td className="px-4 py-2 border">{category.status}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-lg mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.category_id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-lg"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManagement;
