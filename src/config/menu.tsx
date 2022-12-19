import React from "react";
import { Urls } from "../config/const";
import { IconClaim, IconDocument, IconHome, IconUsers } from "./icons";

export type MenuEntry = {
  label: string;
  icon?: React.ReactNode;
  url?: string;
  action?: () => void;
  children?: MenuEntry[];
};

const iconsStyle = {
  marginRight: "0.5em",
  marginTop: "-3px",
  fontSize: "1.2em",
};

export const MenuConfig = {
  items: [
    {
      label: "sideMenu_home",
      url: Urls.home,
      icon: <IconHome style={iconsStyle} />,
    },
    // {
    //   label: "sideMenu_policy",
    //   icon: <IconDocument style={iconsStyle} />,
    //   children: [
    //     {
    //       label: "sideMenu_searchFulltext",
    //       url: Urls.policy_searchFulltext,
    //     },
    //     {
    //       label: "sideMenu_searchByFields",
    //       url: Urls.policy_searchByfields,
    //     },
    //     {
    //       label: "sideMenu_policy_manualInsert",
    //       url: Urls.policy_manualInsert,
    //     },
    //   ],
    // },
    // {
    //   label: "sideMenu_createClaim",
    //   url: Urls.new_claim,
    //   icon: <IconClaim style={iconsStyle} />,
    // },
    // {
    //   label: "sideMenu_subjectsData",
    //   url: Urls.subjects_data,
    //   icon: <IconUsers style={iconsStyle} />,
    // },
  ],
};
