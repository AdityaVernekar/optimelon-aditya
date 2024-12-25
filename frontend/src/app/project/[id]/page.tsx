"use client";

import ScriptGenerator from "@/app/components/ScriptGenerator";
import Sidebar from "@/app/components/Sidebar";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <ScriptGenerator id={id}/>
      </div>
    </div>
  );
}
