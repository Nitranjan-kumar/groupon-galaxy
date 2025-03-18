
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface CategoryFilterProps {
  categories: Category[];
  title?: string;
  className?: string;
}

const CategoryFilter = ({ 
  categories, 
  title = "Browse by Category",
  className 
}: CategoryFilterProps) => {
  const location = useLocation();
  const currentCategoryId = location.pathname.includes('/category/') 
    ? location.pathname.split('/category/')[1] 
    : null;

  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-6", className)}>
      {title && (
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
      )}
      <div className="space-y-2">
        {categories.map(category => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className={cn(
              "block px-3 py-2 rounded-md transition-colors",
              currentCategoryId === category.id 
                ? "bg-groupon-blue text-white" 
                : "text-groupon-darkGray hover:bg-groupon-lightGray"
            )}
          >
            <div className="flex items-center">
              {category.icon && (
                <span className="mr-3">{category.icon}</span>
              )}
              <span>{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
