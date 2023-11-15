import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Link, Route, Routes } from 'react-router-dom';

import './App.css';
import abi from "./contractJson/ExperienceCertificateNFT.json";
import HomePage from './components/HomePage';
import IssuingCertificatesPage from './components/IssuingCertificatesPage';
import ManagingCertificatesPage from './components/ManagingCertificatesPage';
import VerifyingCertificatesPage from './components/VerifyingCertificatesPage';
import UserProfilePage from './components/UserProfilePage';
import AccountTypeSelectionPage from './components/AccountTypeSelectionPage';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const [account, setAccount] = useState("Not Connected");
  const [userType, setUserType] = useState(null);
  const [accountTypeSelection, setAccountTypeSelection] = useState(false);

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x3e1D8A141d15ee148f65a85b2217417444d2A9DE";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          let accounts = await ethereum.request({
            method: "eth_requestAccounts"
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          let account = accounts[0];

          setAccount(account);

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = await provider.getSigner();

          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setState({ provider, signer, contract });

          // Check if the user has selected an account type
          const isRegistered = await contract.userRoles(account) !== 0;
          if (!isRegistered) {
            setAccountTypeSelection(true);
          } else {
            // Check if the user has registered as an employee or organization
            const isEmployee = await contract.isUserEmployee();
            const isOrganization = await contract.isUserOrganization();
            if (isEmployee) {
              setUserType('Employee');
            } else if (isOrganization) {
              setUserType('Organization');
            }
          }
        } else {
          console.error("Ethereum provider (e.g., MetaMask) is not detected.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    template();
  }, [account]);

  const handleRegisterAsEmployee = async () => {
    await state.contract.registerAsEmployee();
    setUserType('Employee');
    setAccountTypeSelection(false);
  };

  const handleRegisterAsOrganization = async () => {
    await state.contract.registerAsOrganization();
    setUserType('Organization');
    setAccountTypeSelection(false);
  };

  return (
    <>
      {!accountTypeSelection && (<nav style={{ display: 'flex', alignItems: 'center' }}>
        <ul style={{ display: 'flex', justifyContent: 'space-around', width: '70%' }}>
          <li><Link to='/'>Home</Link></li>
          {userType === 'Organization' && <li><Link to='/issue'>Issue Certificate</Link></li>}
          <li><Link to='/manage'>Manage Certificate</Link></li>
          <li><Link to='/verify'>Verify Certificate</Link></li>
          <li><Link to='/settings'>Settings</Link></li>
          <li style={{ fontWeight: 'bold', fontSize: '14px', color: 'white' }}>Account: {account}</li>
        </ul>
      </nav>)}

      <Routes>
        {accountTypeSelection && (
          <Route path='/' element={<AccountTypeSelectionPage
            handleRegisterAsEmployee={handleRegisterAsEmployee}
            handleRegisterAsOrganization={handleRegisterAsOrganization}
          />} />
        )}
        <Route path='/' element={<HomePage />} />
        {userType === 'Organization' && <Route path='/issue' element={<IssuingCertificatesPage state={state} account={account} />} />}
        <Route path='/manage' element={<ManagingCertificatesPage state={state} account={account} userType={userType} />} />
        <Route path='/verify' element={<VerifyingCertificatesPage state={state} account={account} />} />
        <Route path='/settings' element={<UserProfilePage account={account} userType={userType} />} />
      </Routes>
    </>
  );
}

export default App;
