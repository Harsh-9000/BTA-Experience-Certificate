import { useState } from 'react';

function VerifyingCertificatesPage({ state, account }) {
    const [formData, setFormData] = useState({
        tokenId: '',
    });

    const { contract } = state;
    const [certificate, setCertificate] = useState(null);
    const [certificateVerificationResult, setCertificateVerificationResult] = useState(null);
    const [employeeVerificationResult, setEmployeeVerificationResult] = useState(null);

    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const formStyle = {
        textAlign: 'left',
    };

    const labelStyle = {
        display: 'block',
        fontWeight: 'bold',
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        marginBottom: '10px', // Add margin between the input and button
    };

    const buttonStyle = {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        marginTop: '10px', // Add margin between the button and input
    };

    const spacedButtonStyle = {
        ...buttonStyle,
        marginLeft: '220px', // Add space between buttons
    };

    const resultStyle = {
        margin: '10px',
        fontWeight: 'bold',
    };

    const errorStyle = {
        color: 'red',
    };

    const successStyle = {
        color: 'green',
    };

    const listItemStyle = {
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '20px',
        margin: '10px 0',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        listStyleType: 'none',
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleGetCertificate = async () => {
        try {
            const retrievedCertificate = await contract.getCertificateById(formData.tokenId);
            setCertificate(retrievedCertificate);
            setCertificateVerificationResult(null); // Reset certificate verification result
            setEmployeeVerificationResult(null); // Reset employee verification result
        } catch (error) {
            console.error('Error getting the required certificate:', error);
            setCertificate(null);
        }
    };

    const handleVerifyCertificate = async () => {
        let verificationOutcome;
        try {
            verificationOutcome = await contract.verifyCertificateAuthenticity(formData.tokenId, certificate[1]);
            console.log(verificationOutcome);
            setCertificateVerificationResult(verificationOutcome);
        } catch (error) {
            console.error('Something Went Wrong :', error);
            setCertificateVerificationResult(null);
        }
    };

    const handleVerifyEmployee = async () => {
        try {
            const verificationOutcome = await contract.verifyEmployeeAuthenticity(formData.tokenId, certificate[2]);
            console.log(verificationOutcome);
            setEmployeeVerificationResult(verificationOutcome);
        } catch (error) {
            console.error('Something Went Wrong :', error);
            setEmployeeVerificationResult(null);
        }
    };

    return (
        <div style={pageStyle}>
            <h1>Verify a Certificate</h1>
            <form onSubmit={(e) => e.preventDefault()} style={formStyle}>
                <label style={labelStyle}>
                    Token ID:
                    <input
                        type="text"
                        name="tokenId"
                        value={formData.tokenId}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </label>

                <button type="button" onClick={handleGetCertificate} style={buttonStyle}>
                    Get Certificate
                </button>

                {certificate && (
                    <div>
                        <li style={listItemStyle}>
                            <h3>{certificate[3]}</h3>
                            <p>{`Employee: ${certificate[4]}`}</p>
                            <p>{`Description: ${certificate[5]}`}</p>
                            <p>{`Start Date: ${certificate[6]}`}</p>
                            <p>{`End Date: ${certificate[7]}`}</p>
                            <p>{`Certificate Holder Address: ${certificate[2]}`}</p>
                            <p>{`Certificate Issuer Address: ${certificate[1]}`}</p>
                            <p>{`Certificate ID: ${certificate[0].toString()}`}</p>
                        </li>

                        {/* Conditionally show message instead of certificate verification button */}
                        {certificateVerificationResult !== null ? (
                            certificateVerificationResult === true ? (
                                <p style={resultStyle}>
                                    Certificate is authentic
                                </p>
                            ) : (
                                <p style={resultStyle}>
                                    Not a valid certificate
                                </p>
                            )
                        ) : (
                            // Show certificate verification button if result is not available
                            <button
                                type="button"
                                onClick={handleVerifyCertificate}
                                style={buttonStyle}
                            >
                                Verify Certificate Authenticity
                            </button>
                        )}

                        {/* Conditionally show message instead of employee verification button */}
                        {employeeVerificationResult !== null ? (
                            employeeVerificationResult === true ? (
                                <p style={resultStyle}>
                                    Employee is authentic
                                </p>
                            ) : (
                                <p style={resultStyle}>
                                    Not a valid employee
                                </p>
                            )
                        ) : (
                            // Show employee verification button if result is not available
                            <button
                                type="button"
                                onClick={handleVerifyEmployee}
                                style={spacedButtonStyle}
                            >
                                Verify Employee Authenticity
                            </button>
                        )}

                        {certificateVerificationResult && (
                            <p style={resultStyle}>
                                {certificateVerificationResult === 'Certificate is authentic' ? (
                                    <span style={successStyle}>{certificateVerificationResult}</span>
                                ) : (
                                    <span style={errorStyle}>{certificateVerificationResult}</span>
                                )}
                            </p>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
}

export default VerifyingCertificatesPage;