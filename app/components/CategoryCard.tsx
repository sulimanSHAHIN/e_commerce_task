export default function CategoryCard({ title }: { title: string }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 cursor-pointer 
                 border-l-4 border-blue-600 hover:border-amber-500 
                 hover:shadow-2xl transform hover:-translate-y-1
                 transition-all duration-300">
      <h2 className="text-lg font-semibold capitalize text-gray-800">{title}</h2>
    </div>
  );
}
