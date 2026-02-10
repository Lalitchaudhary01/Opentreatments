import { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon?: ReactNode;
}

export function GradientCard({ title, value, icon }: Props) {
  return (
    <div className="rounded-2xl p-4 text-white bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="flex items-center justify-between">
        <span className="text-sm opacity-90">{title}</span>
        {icon}
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}
