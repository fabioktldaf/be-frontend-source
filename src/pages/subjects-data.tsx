import React from "react";
import SearchResults from "../components/SubjectsData/SearchResults";
import SearchSubject from "../components/SubjectsData/SearchSubject";
import useApplication from "../hooks/useApplication";
import { SubjectData } from "../types/uses-data.types";
import { useNavigate } from "react-router-dom";

const SubjectsData = () => {
  const app = useApplication();
  const navigate = useNavigate();
  const handleSelect = (subject: SubjectData) => {
    console.log(subject);
    app.editSubject(subject, navigate);
  };

  return (
    <div style={{ width: "900px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "500px" }}>
        <SearchSubject />
      </div>
      <div style={{ width: "500px", marginTop: "3em" }}>
        <SearchResults onSelect={handleSelect} />
      </div>
    </div>
  );
};

export default SubjectsData;
