import EthereumAddress from "./EthereumAddress";

function UserProfilePage({ account }) {
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    return (
        <div style={pageStyle}>
            <h1>User Profile</h1>

            {/* Display Ethereum address */}
            <EthereumAddress account={account} />
        </div>
    );
}

export default UserProfilePage;