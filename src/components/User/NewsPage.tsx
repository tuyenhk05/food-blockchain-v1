import React from "react";
import { Link } from "react-router-dom";
import { newsData } from "../../data/newsData";

export function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Tin Tức & Cập Nhật
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.currentTarget.src = "/images/fallback.jpg";
              }}
            />
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{item.summary}</p>
              <div className="text-xs text-gray-400 mb-4">
                {item.author} • {item.publishedAt}
              </div>
              <div className="mt-auto">
                <Link
                  to={`/news/${item.id}`}
                  className="inline-block px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-500 transition"
                >
                  Xem chi tiết →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
