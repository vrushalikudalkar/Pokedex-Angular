import React from 'react';
import { CheckPicker } from 'rsuite';
import "./multiSelectdropDown.scss";
import PropTypes from 'prop-types';

const AppMultiSelectDropDown = ({ label, onChangeHandler, data, ...props }) => (
  <>
    <div className="multiselect-dropdown-wrapper">
      <div className='dropdown-label'><span>{label}</span></div>
      <div className={`${props.isOpen ? "is-dropdown-open" : ""} check-picker-wrap`}>
        <CheckPicker block placeholder={props.placeholder} onChange={onChangeHandler} size="lg" onOpen={props.onOpenHandler} onClose={props.onCloseHandler} onClean={props.onCleanHandler} data={data} searchable={false} style={{ width: 224 }} />
      </div>
    </div>
  </>
);

AppMultiSelectDropDown.propTypes = {
  data: PropTypes.any,
  placeholder: PropTypes.string,
  onChangeHandler: PropTypes.func,
  isOpen: PropTypes.bool,
  onCloseHandler: PropTypes.func,
  onCleanHandler: PropTypes.func,
  onOpenHandler: PropTypes.func,
  label: PropTypes.any
}

export default AppMultiSelectDropDown;