import SideBar from "@/components/SideBar";
import React from "react";

const page = () => {
  return (
    <div className="w-9/12 mx-auto grid grid-cols-12 bg-white">
      <div className="col-span-3">
        <SideBar />
      </div>
      <div className="col-span-9"></div>
    </div>
  );
};

export default page;
