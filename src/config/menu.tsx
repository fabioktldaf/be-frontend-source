import React from "react";
import { BiHomeAlt, BiSearch } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { BsLightning } from "react-icons/bs";
import { urls } from "../config/const";

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
      url: urls.home,
      icon: <BiHomeAlt />,
    },
    {
      label: "sideMenu_policy",
      icon: <CgFileDocument />,
      children: [
        {
          label: "sideMenu_searchFulltext",
          url: urls.policy_searchFulltext,
        },
        {
          label: "sideMenu_searchByFields",
          url: urls.policy_searchByfields,
        },
        {
          label: "sideMenu_policy_manualInsert",
          url: urls.policy_manualInsert,
        },
      ],
    },
    {
      label: "sideMenu_createClaim",
      url: urls.new_claim,
      icon: <BsLightning />,
    },
  ],
};
