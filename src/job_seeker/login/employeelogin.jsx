import React, { useState } from 'react';
import MobileNumberForm from './employeeloginform';
import OtpVerificationForm from './employeeverifyNumber';

const EmployeeOtpAuth = () => {
    const [contactInfo, setContactInfo] = useState('');
    const [otpRequested, setOtpRequested] = useState(false);

    const handleOtpRequested = (contact) => {
        setContactInfo(contact);
        setOtpRequested(true);
    };

    return (
        <div>
            {!otpRequested ? (
                <MobileNumberForm onOtpRequested={handleOtpRequested} />
            ) : (
                <OtpVerificationForm contactInfo={contactInfo} />
            )}
        </div>
    );
};

export default EmployeeOtpAuth;
