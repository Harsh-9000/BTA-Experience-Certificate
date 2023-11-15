import { useState } from 'react';

function GetAllCertificatesPage({ state, account }) {
    const [formData, setFormData] = useState({
        employeeId: '',
    });

    const { contract } = state;
    const [certificates, setCertificate] = useState(null);

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

    const listStyle = {
        listStyleType: 'none',
        padding: '0',
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
            const retrievedCertificates = await contract.getEmployeeCertificates(formData.employeeId);
            console.log(retrievedCertificates);
            setCertificate(retrievedCertificates);
        } catch (error) {
            console.error('Error getting the required certificate:', error);
            setCertificate(null);
        }
    };

    return (
        <div style={pageStyle}>
            <h1>Get all Certificates of a particular Employee:</h1>
            <form onSubmit={(e) => e.preventDefault()} style={formStyle}>
                <label style={labelStyle}>
                    Employee ID:
                    <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </label>

                <button type="button" onClick={handleGetCertificate} style={buttonStyle}>
                    Get Certificate
                </button>

                {certificates && (
                    <div>
                        <ul style={listStyle}>
                            {certificates.map((certificate) => (
                                <li key={certificate.tokenId} style={listItemStyle}>
                                    <h3>{certificate.company}</h3>
                                    <p>{`Employee: ${certificate.employeeName}`}</p>
                                    <p>{`Description: ${certificate.description}`}</p>
                                    <p>{`Start Date: ${certificate.startDate}`}</p>
                                    <p>{`End Date: ${certificate.endDate}`}</p>
                                    <p>{`Certificate Holder Address: ${certificate.employee}`}</p>
                                    <p>{`Certificate Issuer Address: ${certificate.issuer}`}</p>
                                    <p>{`Certificate ID: ${certificate.tokenId}`}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </div>
    );
}

export default GetAllCertificatesPage;