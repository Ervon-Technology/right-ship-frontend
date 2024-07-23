import React, { useState } from 'react';
import PropTypes from 'prop-types';
import sendmailimg from '../Assets/mailsend.png';

const MailSendPopup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
    window.location.reload();
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="relative bg-white rounded-lg p-6 w-96 shadow-lg">
        <button
          className="absolute top-1 right-4 text-gray-500 hover:text-gray-700 text-2xl rounded"
          onClick={handleClose}
        >
          &times;
        </button>
        <div className="text-center">
          <img
            src={sendmailimg}
            alt="Success"
            className="mx-auto mb-4 w-16 h-15"
          />
          <p className="text-xl font-bold text-blue-900">
            We've successfully sent a confirmation link to your email
          </p>
        </div>
      </div>
    </div>
  );
};

MailSendPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default MailSendPopup;
