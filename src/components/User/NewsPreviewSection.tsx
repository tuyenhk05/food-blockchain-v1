import React from "react";
import { Link } from "react-router-dom";
import { newsData } from "../../data/newsData";

export function NewsPreviewSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {newsData.slice(0, 3).map((item) => (
        <Link
          key={item.id}
          to={`/news/${item.id}`}
          className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {item.summary}
            </p>
            <div className="text-xs text-gray-400 mt-auto">
              {item.author} • {item.publishedAt}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
