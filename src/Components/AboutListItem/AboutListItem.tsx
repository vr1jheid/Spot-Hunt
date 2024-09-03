import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  text: string;
}

export const AboutListItem = ({ icon, title, text }: Props) => {
  return (
    <li className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 p-2">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-md font-medium">{title}</span>
        <span className="text-gray-500">{text}</span>
      </div>
    </li>
  );
};
