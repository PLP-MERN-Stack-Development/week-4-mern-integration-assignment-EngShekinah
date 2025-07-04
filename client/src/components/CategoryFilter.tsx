import React from 'react';
import { X, Hash } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onClear: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onClear
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Hash className="h-5 w-5" />
          <span>Categories</span>
        </h3>
        {selectedCategory && (
          <button
            onClick={onClear}
            className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="text-sm">Clear</span>
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onCategoryChange('')}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
            selectedCategory === ''
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;