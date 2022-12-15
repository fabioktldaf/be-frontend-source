import React from "react";

import { AiOutlineContacts, AiOutlineCheck, AiOutlineSafetyCertificate } from "react-icons/ai";
import { BiHomeAlt, BiSearch, BiEditAlt } from "react-icons/bi";
import { BsLightning, BsCardChecklist } from "react-icons/bs";
import { FiUser, FiUsers } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { RiDeleteBinFill } from "react-icons/ri";
import { SlUser } from "react-icons/sl";

import { InboxOutlined } from "@ant-design/icons";
import { IoIosBusiness } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { FcFlashOn } from "react-icons/fc";

interface IconProps {
  style?: any;
}

export const IconAddress = (props: IconProps) => <></>;
export const IconBetween = (props: IconProps) => <CgArrowsExchangeAlt style={props.style} />;
export const IconBusiness = (props: IconProps) => <IoIosBusiness style={props.style} />;
export const IconCar = (props: IconProps) => <FaCar style={props.style} />;
export const IconClaim = (props: IconProps) => <BsLightning style={props.style} />;
export const IconCheck = (props: IconProps) => <AiOutlineCheck style={props.style} />;
export const IconCheckList = (props: IconProps) => <BsCardChecklist style={props.style} />;
export const IconContact = (props: IconProps) => <AiOutlineContacts style={props.style} />;
export const IconDelete = (props: IconProps) => <RiDeleteBinFill style={props.style} />;
export const IconDocument = (props: IconProps) => <HiOutlineDocumentText style={props.style} />;
export const IconDocuments = (props: IconProps) => <></>;
export const IconEdit = (props: IconProps) => <BiEditAlt style={props.style} />;
export const IconFlash = (props: IconProps) => <FcFlashOn style={props.style} />;
export const IconHome = (props: IconProps) => <BiHomeAlt style={props.style} />;
export const IconInbox = (props: IconProps) => <InboxOutlined style={props.style} />;
export const IconSearch = (props: IconProps) => <BiSearch style={props.style} />;
export const IconSafe = (props: IconProps) => <AiOutlineSafetyCertificate style={props.style} />;
export const IconSubject = (props: IconProps) => <SlUser style={props.style} />;
export const IconUser = (props: IconProps) => <FiUser style={props.style} />;
export const IconUsers = (props: IconProps) => <FiUsers style={props.style} />;
