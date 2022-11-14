import React from "react";
import { Button, Tooltip } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AiFillLock, AiOutlineUser, AiOutlineFileText } from "react-icons/ai";
import { FcMultipleInputs } from "react-icons/fc";
import { GrDocument } from "react-icons/gr";
import { BiSend } from "react-icons/bi";
import { RiFolderReceivedLine } from "react-icons/ri";
import { IoMdCar, IoIosBusiness, IoMdArrowDropleftCircle, IoMdOpen } from "react-icons/io";
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";
import { FcFlashOn } from "react-icons/fc";
import { BsCalendar3 } from "react-icons/bs";
import { CgArrowsExchange } from "react-icons/cg";

import styled from "styled-components";

const SearchResultContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 2em;
`;

const ResultItem = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 5px #aaa;
  border-radius: 5px;
  margin-bottom: 1em;
  overflow: hidden;
`;

const SubjectContainer = styled.div`
  padding: 0.5em 1em;
  display: flex;
  align-items: center;
  background-color: #eee;
  font-size: 1.2em;
  border-bottom: 1px solid #eee;
`;

const SubjectName = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1em 0 0;
  width: 15em;
  cursor: pointer;
`;

const SubjectCode = styled.div`
  display: flex;
  width: 15em;
`;

const PolicyContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 1em 0.5em 5em;
  background-color: aliceblue;
`;

const PolicyNumber = styled.div`
  display: flex;
  align-items: center;
  width: 15em;
  cursor: pointer;
`;

const PolicyDate = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1em;
`;
const PolicyPlate = styled.div`
  display: flex;
  align-items: center;
  width: 10em;
  margin-left: 3em;
`;

const PersonIcon = styled(AiOutlineUser)`
  font-size: 1.2em;
  margin-right: 1em;
  color: grey;
`;

const BusinessIcon = styled(IoIosBusiness)`
  font-size: 1.2em;
  margin-right: 1em;
  color: grey;
`;

const PolicyPlateIcon = styled(IoMdCar)`
  font-size: 1.2em;
  margin-right: 0.5em;
  color: grey;
`;

const PolicyIcon = styled(AiOutlineFileText)`
  font-size: 1.2em;
  margin-right: 0.5em;
  color: grey;
`;

const SinistroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: flex-end;
  border-bottom: 1px dashed #ddd;
  padding: 1em 2em;
  margin-right: 1em;
  &.last {
    border-bottom: none;
  }
`;

const SinistroLocked = styled.div`
  display: flex;
  align-items: center;
`;

const SinistroCreated = styled.div`
  display: flex;
  align-items: center;
`;

const SinistroReceived = styled.div`
  display: flex;
  align-items: center;
`;

const SinistroNumber = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SinistroDate = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2em;
`;

const SinistroIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  font-size: 1.2em;
`;

const IconOpen = styled(IoMdOpen)`
  cursor: pointer;
  font-size: 1.2em;
  margin-right: 0.5em;
  color: grey;
`;

const IconCalendar = styled(BsCalendar3)`
  font-size: 1.2em;
  margin-right: 0.5em;
  color: grey;
`;

const IconBetweenDates = styled(CgArrowsExchange)`
  font-size: 1.2em;
  color: grey;
`;

const FlexSpacer = styled.div`
  flex: 1;
`;

const AddSinistro = styled.div`
  display: flex;
  align-self: flex-end;
`;

type SinistroType = {
  lockedBy?: string;
  created?: {
    numero: string;
    data: string;
  };
  received?: {
    numero: string;
    data: string;
  };
};

type PolizzaType = {
  numero: string;
  targa: string;
  data_inizio: string;
  data_fine: string;
  sinistri?: SinistroType[];
};

type SubjectType = {
  id: number;
  nome?: string;
  cognome?: string;
  ragione_sociale?: string;
  codice_fiscale?: string;
  partita_iva?: string;
  polizze: PolizzaType[];
};

interface ResultType {
  soggetto: SubjectType;
}

const data: ResultType[] = [
  {
    soggetto: {
      id: 1,
      nome: "Mario",
      cognome: "Rossi",
      ragione_sociale: undefined,
      codice_fiscale: "RSSMRA73L09Z103F",
      partita_iva: undefined,
      polizze: [
        {
          numero: "8019000014/M",
          data_inizio: "01/01/2000",
          data_fine: "01/01/2001",
          targa: "AA123AA",
          sinistri: [
            {
              lockedBy: undefined,
              created: {
                numero: "qwerty-987654",
                data: "23/04/2019 10:10",
              },
            },
          ],
        },
      ],
    },
  },
  {
    soggetto: {
      id: 2,
      ragione_sociale: "Aieie Brazorv s.r.l.",
      partita_iva: "01960170684",
      polizze: [
        {
          numero: "234730245743523154",
          data_inizio: "01/01/2002",
          data_fine: "01/01/2001",
          targa: "AA123AA",
          sinistri: [
            {
              lockedBy: undefined,
              created: {
                numero: "abc-987654",
                data: "03/02/2022 18:10",
              },
            },
          ],
        },
        {
          numero: "T864215606",
          data_inizio: "01/01/2004",
          data_fine: "01/01/2005",
          targa: "AA777AA",
          sinistri: [
            {
              lockedBy: undefined,
              created: {
                numero: "abc-987654",
                data: "03/02/2022 18:10",
              },
              received: {
                numero: "cab-987654",
                data: "03/02/2022 18:11",
              },
            },
            {
              lockedBy: undefined,
              received: {
                numero: "zxc-987654",
                data: "03/02/2020 15:11",
              },
            },
            {
              lockedBy: undefined,
              created: {
                numero: "eee-987654",
                data: "03/02/2019 14:11",
              },
            },
          ],
        },
      ],
    },
  },
  {
    soggetto: {
      id: 3,
      nome: "John",
      cognome: "Doe",
      ragione_sociale: undefined,
      codice_fiscale: "DJHNMRA73L09Z103F",
      partita_iva: undefined,
      polizze: [
        {
          numero: "A019000014/0",
          data_inizio: "01/01/2004",
          data_fine: "01/01/2005",
          targa: "SS555SS",
          sinistri: undefined,
        },
      ],
    },
  },
];

const renderAddSinistro = () => (
  <AddSinistro>
    <Tooltip title="Add Sinistro">
      <Button type="primary" size="small">
        +
      </Button>
    </Tooltip>
  </AddSinistro>
);

const SearchResults = () => {
  return (
    <SearchResultContainer>
      {data.map((r) => {
        const s = r.soggetto;

        return (
          <ResultItem>
            <SubjectContainer>
              {s.cognome && s.nome && (
                <SubjectName>
                  <PersonIcon />
                  {`${s.cognome} ${s.nome}`}
                </SubjectName>
              )}
              {s.ragione_sociale && (
                <SubjectName>
                  <BusinessIcon />
                  {`${s.ragione_sociale}`}
                </SubjectName>
              )}
              {s.codice_fiscale && <SubjectCode>{s.codice_fiscale}</SubjectCode>}
              {s.partita_iva && <SubjectCode>{s.partita_iva}</SubjectCode>}
            </SubjectContainer>
            {s.polizze?.map((p) => {
              return (
                <>
                  <PolicyContainer>
                    <PolicyNumber>
                      <PolicyIcon /> {p.numero}
                    </PolicyNumber>
                    <PolicyDate>
                      <IconCalendar /> {p.data_inizio}
                    </PolicyDate>
                    <IconBetweenDates />
                    <PolicyDate>{p.data_fine}</PolicyDate>
                    {p.targa && (
                      <PolicyPlate>
                        <PolicyPlateIcon /> {p.targa}
                      </PolicyPlate>
                    )}
                  </PolicyContainer>
                  {(!p.sinistri || p.sinistri.length === 0) && (
                    <SinistroContainer className="last">{renderAddSinistro()}</SinistroContainer>
                  )}

                  {p.sinistri?.map((si, i2) => {
                    const classLast = i2 === p.sinistri!.length - 1 ? "last" : "";

                    return (
                      <SinistroContainer className={classLast}>
                        <SinistroLocked>{si.lockedBy}</SinistroLocked>
                        {si.created && (
                          <SinistroCreated>
                            <SinistroIconContainer>
                              <FcFlashOn />
                            </SinistroIconContainer>
                            <Tooltip title="Inserito il 01/01/2022">
                              <SinistroNumber> {si.created.numero}</SinistroNumber>
                            </Tooltip>
                            <SinistroIconContainer></SinistroIconContainer>
                            <SinistroDate>
                              <IconCalendar /> {si.created.data}
                            </SinistroDate>
                          </SinistroCreated>
                        )}

                        {!si.created && renderAddSinistro()}

                        {si.received && (
                          <SinistroReceived>
                            <SinistroIconContainer></SinistroIconContainer>
                            <Tooltip title="Ricevuto il 01/01/2022">
                              <SinistroNumber>{si.received.numero}</SinistroNumber>
                            </Tooltip>
                            <SinistroIconContainer>
                              <FcFlashOn />
                            </SinistroIconContainer>
                            <SinistroDate>
                              <IconCalendar /> {si.received.data}
                            </SinistroDate>
                          </SinistroReceived>
                        )}
                      </SinistroContainer>
                    );
                  })}
                </>
              );
            })}
          </ResultItem>
        );
      })}
    </SearchResultContainer>
  );
};

export default SearchResults;
