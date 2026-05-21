// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@4.9.6/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.9.6/access/Ownable.sol";

contract CertificateNFT is ERC721URIStorage, Ownable {

    uint256 public nextTokenId;

    constructor() ERC721("CertiChain", "CERT") {}

    function mint(
        address to,
        string memory tokenURI
    ) public returns (uint256) {

        uint256 tokenId = nextTokenId;

        _safeMint(to, tokenId);

        _setTokenURI(tokenId, tokenURI);

        nextTokenId++;

        return tokenId;
    }
}