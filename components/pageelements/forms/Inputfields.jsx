import React from "react";

export const Inputfield = ({ label, value, onChangeFunction, classNames, placeHolder, type }) => {
  return (
    <div className="field">
      <label className="fieldLable heading-3">{label}</label>
      <input
        type={type}
        className={`form-control  ${ classNames ? classNames : ""}`}
        value={value}
        onChange={onChangeFunction}
        placeholder={placeHolder}
      />
    </div>
  );
};

Inputfield.defaultProps = {
  type: "text",
};

export const CheckBox = ({ key, onChange, checked, classNames, label }) => {
  return (
    <li key={key} className="cat_list_item">
      <input
        onChange={onChange}
        checked={checked}
        type="checkbox"
        className={classNames}
      />
      <label className="form-check-label">{label}</label>
    </li>
  );
};

export const Inputfield_With_Icon = ({ label, value, onChangeFunction, classNames, placeHolder, type, icon, iconClassname, disabled }) => {
  return (
    <div className="inputField">

      <img
        src={icon}
        alt=""
        className={iconClassname}
      />

      <input
        type={type}
        className={`inputCtrl  ${classNames ? classNames : ""}`}
        value={value}
        onChange={onChangeFunction}
        placeholder={placeHolder}
        disabled={disabled}
      />
    </div>
  );
};

Inputfield_With_Icon.defaultProps = {
  type: "text",
  disabled: false
};

