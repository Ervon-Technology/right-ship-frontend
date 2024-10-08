import React, { useState } from 'react';

function CopyUrlButton() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const currentUrl = window.location.href; 
    navigator.clipboard.writeText(currentUrl) 
      .then(() => {
        setCopied(true); 
        setTimeout(() => setCopied(false), 2000); 
      })
      .catch(err => console.error('Failed to copy: ', err)); 
  };

  return (
    <div>
      <button
        onClick={copyToClipboard}
        className="border border-gray-700 text-blue font-normal border-2 p-1 rounded text-sm"
      >
        {copied ? "Copied!" : "Copy URL"}
      </button>
    </div>
  );
}

export default CopyUrlButton;
