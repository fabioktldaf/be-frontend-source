import React from "react";
import { BiHomeAlt, BiSearch } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { BsLightning } from "react-icons/bs";
import { Urls } from "../config/const";

export type MenuEntry = {
  label: string;
  icon?: React.ReactNode;
  url?: string;
  children?: MenuEntry[];
};

export const MenuConfig = {
  items: [
    {
      label: "sideMenu_home",
      url: Urls.home,
      icon: <BiHomeAlt />,
    },
    {
      label: "sideMenu_policy",
      icon: <CgFileDocument />,
      children: [
        {
          label: "sideMenu_searchFulltext",
          url: Urls.policy_searchFulltext,
        },
        {
          label: "sideMenu_searchByFields",
          url: Urls.policy_searchByfields,
        },
        {
          label: "sideMenu_policy_manualInsert",
          url: Urls.policy_manualInsert,
        },
      ],
    },
    {
      label: "sideMenu_createClaim",
      url: Urls.new_claim,
      icon: <BsLightning />,
    },
  ],
};
