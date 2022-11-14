import { store } from "../redux/store";
import { setLanguage } from "../redux/features/userSlice";
import i18next from "i18next";

export interface IApplication {
  init: () => void;
  changeLanguage: (lang: string) => void;
}

export default (): IApplication => {
  return {
    init: () => {
      console.log("init");
    },
    changeLanguage: (lang: string) => {
      i18next.changeLanguage(lang);
      store.dispatch(setLanguage(lang));
    },
  };
};
