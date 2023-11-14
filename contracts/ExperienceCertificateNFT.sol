// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ExperienceCertificateNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("ExperienceCertificates", "EXP") {}

    struct ExperienceCertificate {
        uint256 tokenId;
        address payable issuer;
        address payable employee;
        string company;
        string employeeName;
        string description;
        string startDate;
        string endDate;
    }

    mapping(uint256 => ExperienceCertificate) idToCertificate;

    function issueCertificate(
        address receiver,
        string memory company,
        string memory employeeName,
        string memory description,
        string memory startDate,
        string memory endDate
    ) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 currentTokenId = _tokenIds.current();

        _safeMint(msg.sender, currentTokenId);

        idToCertificate[currentTokenId] = ExperienceCertificate(
            currentTokenId,
            payable(msg.sender),
            payable(receiver),
            company,
            employeeName,
            description,
            startDate,
            endDate
        );

        _transfer(msg.sender, receiver, currentTokenId);

        return currentTokenId;
    }

    function verifyCertificateAuthenticity(
        uint256 tokenId,
        address issuer
    ) public view returns (bool) {
        return idToCertificate[tokenId].issuer == payable(issuer);
    }

    function verifyEmployeeAuthenticity(
        uint256 tokenId,
        address employee
    ) public view returns (bool) {
        return idToCertificate[tokenId].employee == payable(employee);
    }

    function getEmployeeCertificates(
        address employee
    ) public view returns (ExperienceCertificate[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (employee == idToCertificate[i + 1].employee) itemCount++;
        }

        if (itemCount == 0) {
            return new ExperienceCertificate[](0);
        }

        ExperienceCertificate[]
            memory certificates = new ExperienceCertificate[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (employee == idToCertificate[i + 1].employee) {
                uint currentId = i + 1;
                ExperienceCertificate
                    storage currentCertificate = idToCertificate[currentId];
                certificates[currentIndex] = currentCertificate;
                currentIndex++;
            }
        }
        return certificates;
    }

    function getCertificateById(
        uint256 tokenId
    )
        public
        view
        returns (
            uint256,
            address payable,
            address payable,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        ExperienceCertificate memory certificate = idToCertificate[tokenId];

        return (
            certificate.tokenId,
            certificate.issuer,
            certificate.employee,
            certificate.company,
            certificate.employeeName,
            certificate.description,
            certificate.startDate,
            certificate.endDate
        );
    }
}
