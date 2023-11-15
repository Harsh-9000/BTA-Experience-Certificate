const AccountTypeSelectionPage = ({ handleRegisterAsEmployee, handleRegisterAsOrganization }) => {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Select Your Account Type</h2>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={handleRegisterAsEmployee}>Register as Employee</button>
                <button style={styles.button} onClick={handleRegisterAsOrganization}>Register as Organization</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Adjust as needed
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4caf50', // Green color, adjust as needed
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '5px',
    },
};

export default AccountTypeSelectionPage;
