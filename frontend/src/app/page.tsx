"use client"


import Sidebar from "./components/Sidebar";
import ScriptGenerator from "./components/ScriptGenerator";


export default function Home() {

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <ScriptGenerator/>
      </div>
    </div>

  );
}
