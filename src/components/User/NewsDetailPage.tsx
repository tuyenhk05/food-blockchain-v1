import React from "react";
import { useParams, Link } from "react-router-dom";
import { newsData } from "../../data/newsData";
import { CalendarDays, User } from "lucide-react";

export function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const article = newsData.find((item) => item.id === id);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Bài viết không tồn tại
        </h2>
        <Link to="/news" className="text-emerald-600 hover:underline">
          ← Quay lại trang Tin Tức
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Nội dung chính */}
        <article className="lg:col-span-2 bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Ảnh đại diện */}
          <div className="relative">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[420px] object-cover"
            />
          </div>

          {/* Nội dung */}
          <div className="p-10">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-6">
              <Link to="/news" className="hover:text-emerald-600">
                Tin Tức
              </Link>{" "}
              → Chi tiết
            </div>

            {/* Tiêu đề */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Tác giả + ngày đăng */}
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                {article.publishedAt}
              </div>
            </div>

            {/* Nội dung chi tiết */}
            <div className="prose prose-xl max-w-none text-gray-800 leading-relaxed">
              {article.content.split("\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Nút quay lại */}
            <div className="mt-10">
              <Link
                to="/news"
                className="inline-block px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition font-medium"
              >
                ← Quay lại Tin Tức
              </Link>
            </div>
          </div>
        </article>

        {/* Sidebar bài liên quan */}
        <aside className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Bài viết liên quan
          </h3>
          {newsData
            .filter((item) => item.id !== article.id)
            .map((related) => (
              <Link
                key={related.id}
                to={`/news/${related.id}`}
                className="block bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
              >
                <img
                  src={related.image}
                  alt={related.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-md font-semibold text-gray-900 mb-2">
                    {related.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {related.summary}
                  </p>
                </div>
              </Link>
            ))}
        </aside>
      </div>
    </div>
  );
}
