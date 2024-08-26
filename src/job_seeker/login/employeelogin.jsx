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

    const handleChangeContactInfo = () => {
        setOtpRequested(false);
        setContactInfo('');
    };

    return (
        <div>
            {!otpRequested ? (
                <MobileNumberForm onOtpRequested={handleOtpRequested} />
            ) : (
                <OtpVerificationForm contactInfo={contactInfo} onChangeContactInfo={handleChangeContactInfo} />
            )}
        </div>
    );
};

export default EmployeeOtpAuth;
