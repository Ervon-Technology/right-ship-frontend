import React, { useState } from "react";

const CopyUrlButton = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    const url = window.location.href; // Get the current URL

    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true); 
      setTimeout(() => setIsCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  return (
    <div>
      <button
        onClick={copyToClipboard}
        className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
      >
        {isCopied ? "Copied!" : "Copy URL"}
      </button>
    </div>
  );
};

export default CopyUrlButton;
