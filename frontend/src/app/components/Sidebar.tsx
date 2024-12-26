import { useRouter } from "next/navigation";
import { useProjects } from "../hooks/useProjects";

// frontend/components/Sidebar.js
export default function Sidebar({}) {
  const { data, isLoading } = useProjects();

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen w-64 bg-gray-800 text-white flex flex-col justify-center items-center">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        Marketing SaaS
      </div>
      <ul className="flex-1 overflow-y-auto">
        <li
          key={"hi"}
          onClick={() => {
            router.push(`/`);
          }}
          className="p-4 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 font-semibold"
        >
          Create New Project
        </li>
        {data?.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              router.push(`/project/${item?.id}`);
            }}
            className="p-4 cursor-pointer hover:bg-gray-700"
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className="p-4 border-t border-gray-700">Assignment by Aditya</div>
    </div>
  );
}
