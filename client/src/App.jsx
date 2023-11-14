import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Link, Route, Routes } from 'react-router-dom';

import './App.css'
import abi from "./contractJson/ExperienceCertificateNFT.json"
import HomePage from './components/HomePage';
import IssuingCertificatesPage from './components/IssuingCertificatesPage';
import ManagingCertificatesPage from './components/ManagingCertificatesPage';
import VerifyingCertificatesPage from './components/VerifyingCertificatesPage';
import UserProfilePage from './components/UserProfilePage';


function App() {
  const [state, setState] = useState({
    providor: null,
    signer: null,
    contract: null
  })

  const [account, setAccount] = useState("Not Connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x404767879bd3A33394f48426B9b0fa91D8AE862F";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          let accounts = await ethereum.request({
            method: "eth_requestAccounts"
          })

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
          )

          setState({ provider, signer, contract });
        } else {
          console.error("Ethereum provider (e.g., MetaMask) is not detected.");
        }
      } catch (error) {
        console.log(error);
      }
    }

    template();
  }, [])

  return (
    <>
      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <ul style={{ display: 'flex', justifyContent: 'space-around', width: '70%' }}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/issue'>Issue Certificate</Link></li>
          <li><Link to='/manage'>Manage Certificate</Link></li>
          <li><Link to='/verify'>Verify Certificate</Link></li>
          <li><Link to='/settings'>Settings</Link></li>
          <li style={{ fontWeight: 'bold', fontSize: '14px', color: 'white' }}>Account: {account}</li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/issue' element={<IssuingCertificatesPage state={state} account={account} />} />
        <Route path='/manage' element={<ManagingCertificatesPage state={state} account={account} />} />
        <Route path='/verify' element={<VerifyingCertificatesPage state={state} account={account} />} />
        <Route path='/settings' element={<UserProfilePage account={account} />} />
      </Routes>
    </>
  )
}

export default App
