import React from "react";

const Footer = () => {
  return (
    <main className="flex justify-center items-center ">
      <footer className="p-6">
        <div className="flex flex-col items-center justify-center ">
          <code className="text-center">
            This is fan-made and not affiliated with Riot Games.
          </code>
          <code className="relative rounded bg-destructive px-2 py-1 font-mono text-sm font-semibold">
            Note: The data displayed may contain errors due to faults in the API.
          </code>
        </div>
      </footer>
    </main>
  );
};

export default Footer;
