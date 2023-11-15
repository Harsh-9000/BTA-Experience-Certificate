// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ExperienceCertificateNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    enum UserType {
        None,
        Employee,
        Organization
    }

    mapping(address => UserType) public userRoles;
    mapping(address => bool) public isEmployeeRegistered;
    mapping(address => bool) public isOrganizationRegistered;

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
    mapping(address => uint256[]) organizationCertificates;

    function registerAsEmployee() external {
        require(
            userRoles[msg.sender] == UserType.None,
            "User already has a role"
        );
        userRoles[msg.sender] = UserType.Employee;
        isEmployeeRegistered[msg.sender] = true;
    }

    function registerAsOrganization() external {
        require(
            userRoles[msg.sender] == UserType.None,
            "User already has a role"
        );
        userRoles[msg.sender] = UserType.Organization;
        isOrganizationRegistered[msg.sender] = true;
    }

    function isUserOrganization() external view returns (bool) {
        return userRoles[msg.sender] == UserType.Organization;
    }

    function isUserEmployee() external view returns (bool) {
        return userRoles[msg.sender] == UserType.Employee;
    }

    function issueCertificate(
        address receiver,
        string memory company,
        string memory employeeName,
        string memory description,
        string memory startDate,
        string memory endDate
    ) public payable returns (uint256) {
        require(
            userRoles[msg.sender] == UserType.Organization,
            "Only organizations can issue certificates"
        );

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

        organizationCertificates[msg.sender].push(currentTokenId);

        _transfer(msg.sender, receiver, currentTokenId);

        return currentTokenId;
    }

    function getOrganizationCertificates(
        address organization
    ) public view returns (ExperienceCertificate[] memory) {
        uint256[] memory certificateIds = organizationCertificates[
            organization
        ];
        ExperienceCertificate[]
            memory certificates = new ExperienceCertificate[](
                certificateIds.length
            );

        for (uint256 i = 0; i < certificateIds.length; i++) {
            certificates[i] = idToCertificate[certificateIds[i]];
        }

        return certificates;
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
