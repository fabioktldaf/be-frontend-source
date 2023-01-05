import React from "react";
import { Input, Form, Select as SelectAnt, InputNumber, DatePicker, TimePicker, Segmented, Switch } from "antd";
import styled from "styled-components";
import { Hidden } from "./containers";
import { SelectPair } from "../types/new-claim.types";
import moment from "moment";
import { SegmentedValue } from "antd/lib/segmented";
import { StringMappingType } from "typescript";

export const FormItemStyled = styled(Form.Item)`
  flex: 1;
  margin: 0;

  .ant-input-number {
    width: 100%;

    input {
      text-align: right;
      padding-right: 2em;
    }
  }

  .ant-picker {
    width: 10em;
  }
`;

interface InputProps {
  name?: string;
  classNameItem?: string;
  classNameInput?: string;
  styleItem?: any;
  styleInput?: any;
  value?: any;
  defaultValue?: any;
  label?: string;
  tooltip?: string;
  rules?: any;
  placeholder?: string;
  readOnly?: boolean;
}

interface InputTextProps extends InputProps {
  maxLength?: number;
  mimLength?: number;
  onChange?: (text: string) => void;
}

export const InputTextStyled = (props: InputTextProps) => {
  return (
    <FormItemStyled
      className={props.classNameItem}
      name={props.name}
      style={props.styleItem}
      label={props.label}
      tooltip={props.tooltip}
    >
      <Input
        className={props.classNameInput}
        style={props.styleInput}
        min={props.mimLength}
        max={props.maxLength}
        onChange={(e) => (props.onChange ? props.onChange(e.target.value) : null)}
        value={props.value}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
      />
      <Hidden>{props.value}</Hidden>
    </FormItemStyled>
  );
};

interface InputNumberProps extends InputProps {
  max?: number;
  min?: number;
  onChange: (val: number) => void;
}

export const InputNumberStyled = (props: InputNumberProps) => {
  return (
    <FormItemStyled
      className={props.classNameItem}
      name={props.name}
      style={props.styleItem}
      label={props.label}
      tooltip={props.tooltip}
      rules={props.rules}
    >
      <InputNumber
        type="number"
        className={props.classNameInput}
        style={props.styleInput}
        min={props.min}
        max={props.max}
        onChange={(val) => props.onChange(val)}
        value={props.value}
        defaultValue={props.defaultValue}
        readOnly={props.readOnly}
      />
      <Hidden>{props.value}</Hidden>
    </FormItemStyled>
  );
};

interface SelectProps extends InputProps {
  showSearch?: boolean;
  filterOption?: (input: any, option: SelectPair | undefined) => boolean;
  options: SelectPair[];
  onChange: (val: any) => void;
}

export const SelectStyled = (props: SelectProps) => {
  return (
    <FormItemStyled
      className={props.classNameItem}
      name={props.name}
      style={props.styleItem}
      label={props.label}
      tooltip={props.tooltip}
    >
      <SelectAnt
        showSearch={props.showSearch}
        className={props.classNameInput}
        style={props.styleInput}
        onChange={(val) => props.onChange(val)}
        value={props.value}
        defaultValue={props.defaultValue}
        options={props.options}
        filterOption={props.filterOption}
      />
      <Hidden>{props.value}</Hidden>
    </FormItemStyled>
  );
};

interface DatePickerProps extends InputProps {
  onChange: (val: any) => void;
  format?: string;
}

export const DatePickerStyled = (props: DatePickerProps) => {
  return (
    <FormItemStyled
      className={props.classNameItem}
      name={props.name}
      style={props.styleItem}
      label={props.label}
      tooltip={props.tooltip}
    >
      <DatePicker
        placeholder={props.placeholder}
        onChange={(val) => props.onChange(val?.format(props.format))}
        value={moment(props.value as string, props.format)}
        format={props.format}
      />
      <Hidden>{props.value?.toString()}</Hidden>
    </FormItemStyled>
  );
};

interface TimePickerProps extends InputProps {
  onChange: (val: any) => void;
  format?: string;
}

export const TimePickerStyled = (props: TimePickerProps) => {
  return (
    <FormItemStyled
      className={props.classNameItem}
      name={props.name}
      style={props.styleItem}
      label={props.label}
      tooltip={props.tooltip}
    >
      <TimePicker
        placeholder={props.placeholder}
        onChange={(val) => props.onChange(val?.toString())}
        value={moment(props.value as string, props.format)}
        format={props.format}
      />
      <Hidden>{props.value?.toString()}</Hidden>
    </FormItemStyled>
  );
};

interface SegmentedProps extends InputProps {
  onChange: (val: SegmentedValue) => void;
  options: string[];
}

export const SegmentedStyled = (props: SegmentedProps) => {
  return (
    <FormItemStyled
      className={props.classNameItem}
      name={props.name}
      style={props.styleItem}
      label={props.label}
      tooltip={props.tooltip}
    >
      <Segmented
        placeholder={props.placeholder}
        onChange={(val) => props.onChange(val)}
        value={props.value}
        options={props.options}
      />
      <Hidden>{props.value?.toString()}</Hidden>
    </FormItemStyled>
  );
};

interface FiscalCodeProps extends InputTextProps {
  name?: string;
  lastname?: string;
  dateOfBirth?: string;
  cityOfBirth?: string;
  countryOfBirth?: string;
  style?: any;
}

export const FiscalCodeStyled = (props: FiscalCodeProps) => {
  const handleOnChange = (val: string) => {
    props.onChange!(val);
  };

  return (
    <InputTextStyled
      label={props.label}
      tooltip={props.tooltip}
      rules={props.rules}
      placeholder={props.placeholder}
      onChange={handleOnChange}
      value={props.value}
      styleInput={props.style}
    />
  );
};

interface InputAddressProps extends InputTextProps {
  onEdit: (data: any) => void;
  value: string;
}

export const InputAddress = (props: InputAddressProps) => {
  return (
    <FormItemStyled
      className={props.classNameItem}
      name={props.name}
      style={props.styleItem}
      label={props.label}
      tooltip={props.tooltip}
    >
      <Input value={props.value} readOnly={true} style={Object.assign({}, props.styleInput, { cursor: "pointer" })} />

      <Hidden>{props.value}</Hidden>
    </FormItemStyled>
  );
};

interface SwitchProps {
  classNameItem?: string;
  classNameInput?: string;
  styleItem?: any;
  styleInput?: any;
  label?: string;
  tooltip?: string;
  rules?: any;
  placeholder?: string;
  readOnly?: boolean;
  checked?: boolean;
  unCheckedChildren: string;
  checkedChildren: string;
  onChange?: (checked: boolean) => void;
}

export const SwitchStyled = (props: SwitchProps) => (
  <FormItemStyled className={props.classNameItem} style={props.styleItem} label={props.label} tooltip={props.tooltip}>
    <Switch
      className={props.classNameInput}
      unCheckedChildren={"No"}
      checkedChildren={"Si"}
      onChange={(val) => (props.onChange ? props.onChange(val) : null)}
      checked={props.checked}
    />
    <Hidden>{props.checked}</Hidden>
  </FormItemStyled>
);
