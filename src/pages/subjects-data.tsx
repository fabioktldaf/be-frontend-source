import React from "react";
import SearchResults from "../components/SubjectsData/SearchResults";
import SearchSubject from "../components/SubjectsData/SearchSubject";
import useApplication from "../hooks/useApplication";
import { SubjectData } from "../types/uses-data.types";
import { useNavigate } from "react-router-dom";
import { ButtonConfirm } from "../components/Layout/Buttons";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const SubjectsData = () => {
  const app = useApplication();
  const navigate = useNavigate();
  const { isSearching, term } = useSelector((state: RootState) => state.subjects.search);

  const handleSelect = (subject: SubjectData) => {
    console.log(subject);
    app.editSubject(Object.assign({}, subject), navigate);
  };

  const canAddNewSubjeject = !isSearching && term.length > 0;

  return (
    <div style={{ width: "900px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "500px" }}>
        <SearchSubject />
      </div>

      <div style={{ display: "flex", padding: "2em 0 0 0", justifyContent: "flex-end" }}>
        <ButtonConfirm
          onClick={() => app.addNewSubject(navigate)}
          text={"Aggiungi Nuovo"}
          disabled={!canAddNewSubjeject}
        />
      </div>

      <div style={{ width: "500px", marginTop: "3em" }}>
        <SearchResults onSelect={handleSelect} />
      </div>
    </div>
  );
};

export default SubjectsData;
