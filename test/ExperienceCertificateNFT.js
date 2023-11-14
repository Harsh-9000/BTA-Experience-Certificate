// test/ExperienceCertificateNFT.test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ExperienceCertificateNFT", function () {
    let experienceCertificateNFT;

    beforeEach(async function () {
        experienceCertificateNFT = await ethers.deployContract(
            "ExperienceCertificateNFT"
        );
    });

    it("should return all certificates for the given employee", async function () {
        const [issuer, receiver] = await ethers.getSigners();

        // Issue a certificate to the receiver
        await experienceCertificateNFT.issueCertificate(
            receiver.address,
            "Google",
            "Alice",
            "Software Engineer",
            "2023-01-01",
            "2024-01-01"
        );

        await experienceCertificateNFT.issueCertificate(
            receiver.address,
            "Goole",
            "Alice",
            "Software Engineer",
            "2023-01-01",
            "2024-01-01"
        );

        // Get the employee's certificates
        const certificates = await experienceCertificateNFT.getEmployeeCertificates(
            receiver.address
        );

        // Assert that there is one certificate
        expect(certificates.length).to.equal(2);

        console.log(certificates);
        console.log(receiver.address);
        console.log(issuer.address);
    });
});
