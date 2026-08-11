"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface LimitComponentProps {
  onClose?: () => void; 
}

const LimitComponent = ({ onClose }: LimitComponentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const countAPage = searchParams.get("countAPage") || "8";

  const handleLimitChange = (newLimit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newLimit === "8") params.delete("countAPage");
    else params.set("countAPage", newLimit);
    params.delete("page");
    router.push(`?${params.toString()}`);
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
      <label
        htmlFor="countAPage"
        className="text-xs lg:text-sm font-bold text-gray-300 uppercase tracking-wider sm:normal-case sm:tracking-normal sm:font-medium sm:text-gray-400 whitespace-nowrap"
      >
        Show:
      </label>
      <select
        id="countAPage"
        value={countAPage}
        onChange={(e) => handleLimitChange(e.target.value)}
        className="w-full appearance-none bg-none sm:w-auto bg-neutral-800 text-white text-sm rounded-lg p-2.5 border border-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer"
      >
        <option value="8">&nbsp;8 per page</option>
        <option value="16">16 per page</option>
        <option value="32">32 per page</option>
      </select>
    </div>
  );
};

export default LimitComponent;