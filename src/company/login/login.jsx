// src/job_seeker/login/OtpAuth.jsx

import React, { useState } from 'react';
import MobileNumberForm from './mobileNumberForm';
import OtpVerificationForm from './verifyNumber';

const CompanyOtpAuth = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [otpRequested, setOtpRequested] = useState(false);

    const handleOtpRequested = (mobile) => {
        setMobileNumber(mobile);
        setOtpRequested(true);
    };

    return (
        <div>
            {!otpRequested ? (
                <MobileNumberForm onOtpRequested={handleOtpRequested} />
            ) : (
                <OtpVerificationForm mobileNumber={mobileNumber} />
            )}
        </div>
    );
};

export default CompanyOtpAuth;
