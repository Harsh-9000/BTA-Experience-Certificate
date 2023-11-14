async function main() {
    
    const [deployer] = await ethers.getSigners();

    const experienceCertificate = await ethers.deployContract("ExperienceCertificateNFT");

    console.log("Contract Address:", experienceCertificate.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// 0x7c47245999765474230136DC2507b2f2C483d4D8