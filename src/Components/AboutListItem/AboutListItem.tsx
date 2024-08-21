import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  text: string;
}

export const AboutListItem = ({ icon, title, text }: Props) => {
  return (
    <li className="flex gap-3 items-center">
      <div className="bg-gray-100 p-2 rounded-lg w-11 h-11 flex items-center justify-center">
        {icon}
      </div>
      <div className=" flex flex-col">
        <span className=" text-md font-medium">{title}</span>
        <span className="text-gray-500">{text}</span>
      </div>
    </li>
  );
};
