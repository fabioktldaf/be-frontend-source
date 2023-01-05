import { useMsal } from "@azure/msal-react";
import { Button, Input, Modal, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { loginRequest } from "../../config/authConfig";
import { InputTextStyled } from "../../style/Input";
import { ButtonConfirm } from "../Layout/Buttons";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3em 2em 0em 2em;
`;

const SearchBox = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 8em;
  align-items: center;
  justify-content: center;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
`;

const ResultItem = styled.div`
  display: grid;
  grid-template-columns: auto 15% 15%;
  cursor: pointer;
  margin-bottom: 0.5em;
  padding: 0.5em;

  &:hover {
    background-color: #eee;
  }
`;

const ResultItemAddress = styled.div``;

const ResultProvince = styled.div`
  text-align: right;
`;

const ResultCountry = styled.div`
  text-align: right;
`;

export type AddressResultType = {
  country: string;
  province: string;
  fullAddress: string;
  city: string;
  street: string;
  civic: string;
  postalCode: string;
};

interface AddressProps {
  onSelect: (address: AddressResultType) => void;
  countries?: string;
}

const Address = (props: AddressProps) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState<string | undefined>();
  const { instance, accounts } = useMsal();
  const [accessTokeRequest] = useState({
    ...loginRequest,
    account: accounts[0],
  });
  const [results, setResults] = useState<AddressResultType[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressResultType>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setQuery(undefined);
    setSelectedAddress(undefined);
    setResults([]);
  };

  const handleSelectAddress = (address: AddressResultType) => {
    setIsModalOpen(false);
    setIsSearching(false);
    setSelectedAddress(address);
    if (!!props.onSelect) props.onSelect(address);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setIsSearching(false);
  };

  const handleQueryChange = (q: string) => {
    console.log("query ", q);
    setQuery(q);
  };

  const handleKeypress = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") handleSearch();
  };

  const handleSearch = async () => {
    console.log("call search api");
    setIsSearching(true);

    let accessToken: string;

    try {
      // if user still authenticated
      accessToken = (await instance.acquireTokenSilent(accessTokeRequest)).accessToken;
    } catch (e) {
      // if session is expired
      accessToken = (await instance.acquireTokenPopup(accessTokeRequest)).accessToken;
    }

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);

    let params = "&language=it-IT&limit=10";

    if (props.countries?.length) params += `&countrySet=${props.countries}`;

    const subscriptionKey = "8g2Ba0cK4pleI-ftNjVby9QcqbSCbWw_RqMmSAkblbI";

    const url = `https://atlas.microsoft.com/search/address/json?&subscription-key=${subscriptionKey}&api-version=1.0&language=en-US&query=${query}${params}`;

    try {
      const response = await fetch(url, { method: "GET", headers });
      const data = await response.json();

      console.log("search result: ", data);
      if (!(data?.results?.length > 0)) return;

      const newResults = data.results.map(
        (r: any) =>
          ({
            country: r.address.country,
            province: r.address.countrySecondarySubdivision,
            fullAddress: r.address.freeformAddress,
            city: r.address.municipality,
            street: r.address.streetName,
            civic: r.address.streetNumber,
            postalCode: r.address.postalCode,
          } as AddressResultType)
      );

      setResults(newResults);
      setIsSearching(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ cursor: "pointer", margin: "1em" }}>
      <div>
        {selectedAddress ? (
          <div onClick={handleOpenModal}>
            {selectedAddress.fullAddress}{" "}
            {selectedAddress.fullAddress.indexOf(selectedAddress.province) > 0 ? "" : selectedAddress.province}{" "}
            {selectedAddress.country}
          </div>
        ) : (
          <Button onClick={handleOpenModal}>seleziona</Button>
        )}
      </div>
      <Modal open={isModalOpen} footer={null} onCancel={handleModalCancel} width="90%">
        <ModalContent>
          <SearchBox>
            <Input
              placeholder="indirizzo..."
              onChange={(e) => handleQueryChange(e.currentTarget.value)}
              readOnly={isSearching}
              value={query}
              onKeyPress={handleKeypress}
            />
            <ButtonContainer>
              {isSearching ? <Spin /> : <ButtonConfirm children={t("search") || ""} onClick={handleSearch} />}
            </ButtonContainer>
          </SearchBox>
          {!isSearching && results && (
            <Results>
              {results.map((r: AddressResultType, i: number) => (
                <ResultItem key={i} onClick={() => handleSelectAddress(r)}>
                  <ResultItemAddress>{r.fullAddress}</ResultItemAddress>
                  <ResultProvince>{r.province}</ResultProvince>
                  <ResultCountry>{r.country}</ResultCountry>
                </ResultItem>
              ))}
            </Results>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Address;
