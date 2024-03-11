import React from "react";
import clsx from "clsx";
import { CheckIcon } from "lucide-react";

interface TagComponentProps {
  title: string;
  colorName: string;
  selectedColor?: string;
  setSelectedColor?: (color: string) => void;
}

const TagComponent: React.FC<TagComponentProps> = ({
  colorName,
  title,
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <div
      className={clsx("p-2 rounded-sm flex-shrink-0 text-xs cursor-pointer", {
        "bg-[#57acea]/10 text-[#57acea]": colorName === "BLUE",
        "bg-[#ffac7e]/10 text-[#ffac7e]": colorName === "ORANGE",
        "bg-rose-500/10 text-rose-500": colorName === "ROSE",
        "bg-emerald-400/10 text-emerald-400": colorName === "GREEN",
        "bg-purple-400/10 text-purple-400": colorName === "PURPLE",
        "border-[1px] border-[#57acea]": colorName === "BLUE" && !title,
        "border-[1px] border-[#ffac7e]": colorName === "ORANGE" && !title,
        "border-[1px] border-rose-500": colorName === "ROSE" && !title,
        "border-[1px] border-emerald-400": colorName === "GREEN" && !title,
        "border-[1px] border-purple-400": colorName === "PURPLE" && !title,
        "h-5 w-5 flex items-center justify-center p-0": !title,
      })}
      key={colorName}
      onClick={() => {
        if (setSelectedColor) setSelectedColor(colorName);
      }}
    >
      {selectedColor === colorName && <CheckIcon className="h-3 w-3" />}
      {title}
    </div>
  );
};

export default TagComponent;
