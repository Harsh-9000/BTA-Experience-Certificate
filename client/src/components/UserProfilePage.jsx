function UserProfilePage({ account, userType }) {
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    console.log(userType);

    return (
        <div style={pageStyle}>
            <h1>User Profile</h1>

            <h2>Ethereum Address</h2>
            <p>{account}</p>

            <h2>Account Type</h2>
            <p>{userType}</p>
        </div>
    );
}

export default UserProfilePage;