export interface INewSubject {
  clearLocalStorage: () => void;
  updateSubjectData: (val: any) => void;
  updateContactsData: (val: any) => void;
  updateAddressesData: (val: any) => void;
  updateDocumentsData: (val: any) => void;
}

const NewSubject: INewSubject = {
  clearLocalStorage: () => {},
  updateSubjectData: (val: any) => {},
  updateContactsData: (val: any) => {},
  updateAddressesData: (val: any) => {},
  updateDocumentsData: (val: any) => {},
};

export default NewSubject;
