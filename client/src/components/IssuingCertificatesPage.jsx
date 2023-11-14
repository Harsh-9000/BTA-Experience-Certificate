import { useState } from 'react';

const IssuingCertificatesPage = ({ state, account }) => {
    const [formData, setFormData] = useState({
        company: '',
        employeeName: '',
        description: '',
        startDate: '',
        endDate: '',
        employeeAddress: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { contract } = state;
        const company = document.querySelector("#company").value;
        const employeeName = document.querySelector("#employeeName").value;
        const description = document.querySelector("#description").value;
        const startDate = document.querySelector("#startDate").value;
        const endDate = document.querySelector("#endDate").value;
        const employeeAddress = document.querySelector("#employeeAddress").value;


        try {
            const transaction = await contract.issueCertificate(
                employeeAddress,
                company,
                employeeName,
                description,
                startDate,
                endDate
            );

            await transaction.wait();
        } catch (error) {
            console.error('Error issuing certificate:', error);
        }
    };

    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const formStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
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
        margin: '15px 20px', // Add margin for space between inputs
    };

    const buttonContainerStyle = {
        gridColumn: '1 / span 2', // Span 2 columns
        textAlign: 'center', // Center the button horizontally
    };

    const buttonStyle = {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    return (
        <div style={pageStyle}>
            <h1>Issue a New Certificate</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <label style={labelStyle}>Company:</label>
                    <input
                        type="text"
                        name="company"
                        id='company'
                        value={formData.company}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </div>

                <div>
                    <label style={labelStyle}>Employee Name:</label>
                    <input
                        type="text"
                        name="employeeName"
                        id="employeeName"
                        value={formData.employeeName}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </div>

                <div>
                    <label style={labelStyle}>Description:</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </div>

                <div>
                    <label style={labelStyle}>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </div>

                <div>
                    <label style={labelStyle}>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </div>

                <div>
                    <label style={labelStyle}>Employee&apos;s Address:</label>
                    <input
                        type="text"
                        name="employeeAddress"
                        id="employeeAddress"
                        value={formData.employeeAddress}
                        onChange={handleInputChange}
                        style={inputStyle}
                    />
                </div>

                <div style={buttonContainerStyle}>
                    <button type="submit" style={buttonStyle}>Issue Certificate</button>
                </div>
            </form>
        </div>
    );
};

export default IssuingCertificatesPage;
