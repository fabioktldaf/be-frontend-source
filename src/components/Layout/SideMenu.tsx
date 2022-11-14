import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import type { MenuProps } from "antd";
import { Menu } from "antd";
//import translate from "../../config/translations";
import { useTranslation } from "react-i18next";

import { MenuConfig, MenuEntry } from "../../config/menu";

import styled from "styled-components";

const SideMenuStyled = styled(Menu)``;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem =>
  ({
    label,
    key,
    icon,
    children,
    type,
  } as MenuItem);

const buildMenuItems = (lang: string, t: (txt: string) => string) => {
  return MenuConfig.items.map((entry: MenuEntry, i: number) => {
    const key = "" + i;
    const text = t(entry.label);
    const label = entry.url ? <Link to={entry.url}>{text}</Link> : text;

    return getItem(
      label,
      key,
      entry.icon,
      entry.children?.map((childEntry, childIndex) => {
        const childText = t(childEntry.label);
        const childLabel = childEntry.url ? <Link to={childEntry.url}>{childText}</Link> : text;

        return getItem(childLabel, `${key}-${childIndex}`, childEntry.icon);
      })
    );
  });
};

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const SideMenu: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const language = useSelector((state: RootState) => state.user.language);

  const items: MenuProps["items"] = buildMenuItems(language, t);

  return <SideMenuStyled defaultSelectedKeys={["1"]} mode="inline" items={items} />;
};

export default SideMenu;
