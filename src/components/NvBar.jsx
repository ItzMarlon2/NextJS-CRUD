import Link from "next/link";
import React from "react";

const NvBar = () => {
  return (
    <nav className="bg-zinc-900 text-white py-3 mb-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link href='/' className="text-xl">NextMySQL</Link>
        <ul>
          <li>
            <Link className="text-sky-500 hover:text-sky-400" href="/new">New</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NvBar;
