const HomePage = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
    };

    const contentStyle = {
        textAlign: 'center',
    };

    const headingStyle = {
        fontSize: '36px',
        color: '#333',
        fontWeight: 'bold',
    };

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <h1 style={headingStyle}>
                    Welcome to the Experience Certificate DApp
                </h1>
            </div>
        </div>
    );
};

export default HomePage;
