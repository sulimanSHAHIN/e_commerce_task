type CategoryCardProps = {
  title: string;
};

export default function CategoryCard({ title }: CategoryCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 text-center cursor-pointer hover:scale-105 transition">
      <div className="text-xl font-semibold capitalize">{title}</div>
    </div>
  );
}
