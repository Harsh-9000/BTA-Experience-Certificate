import { useState, useEffect } from 'react';

function ManagingCertificatesPage({ state, account, userType }) {
    const [certificates, setCertificates] = useState([]);

    const { contract } = state;

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                if (userType === 'Organization') {
                    const fetchedCertificates = await contract.getOrganizationCertificates(account);
                    console.log(fetchedCertificates);
                    if (fetchedCertificates && fetchedCertificates.length > 0) {
                        const reversedCertificates = [...fetchedCertificates].reverse();
                        setCertificates(reversedCertificates);
                    } else {
                        console.log("No certificates found");
                    }
                } else if (userType === 'Employee') {
                    const fetchedCertificates = await contract.getEmployeeCertificates(account);
                    if (fetchedCertificates && fetchedCertificates.length > 0) {
                        const reversedCertificates = [...fetchedCertificates].reverse();
                        setCertificates(reversedCertificates);
                    } else {
                        console.log("No certificates found");
                    }
                }
            } catch (error) {
                console.log("Something went wrong: ", error);
            }
        }

        contract && fetchCertificates();
    }, [contract, account, userType]);

    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    };

    return (
        <div style={pageStyle}>
            <h1>Manage Your Certificates</h1>
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
    );
}

export default ManagingCertificatesPage;
