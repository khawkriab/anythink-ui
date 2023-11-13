import React from 'react';
import FieldCheckboxGroup from './FieldCheckboxGroup';
import FieldCheckbox from './FieldCheckbox';
import FieldFile from './FieldFile';
import FieldMask from './FieldMask';
import FieldRadioGroup from './FieldRadioGroup';
import FieldRadio from './FieldRadio';
import FieldSelect from './FieldSelect';
import FieldTextArea from './FieldTextarea';
import FieldNumeric from './FieldNumeric';
import FieldControl from './FieldControl';
import FieldDateCalendar from './FieldDateCalendar';

function Field({ type = '', ...props }) {
  if (type === 'checkbox-group') return <FieldCheckboxGroup {...props} />;

  if (type === 'checkbox') return <FieldCheckbox {...props} />;

  if (type === 'file') return <FieldFile {...props} />;

  //   if (type === 'date') return <FieldDate {...props} />;

  if (type === 'mask') return <FieldMask {...props} mask={props.mask} />;

  if (type === 'radio-group') return <FieldRadioGroup {...props} />;

  if (type === 'radio') return <FieldRadio {...props} />;

  if (type === 'select') return <FieldSelect {...props} />;

  if (type === 'textarea') return <FieldTextArea {...props} />;

  if (type === 'numeric') return <FieldNumeric {...props} />;

  return <FieldControl {...props} />;
}

Field.Checkbox = FieldCheckbox;
Field.CheckboxGroup = FieldCheckboxGroup;
Field.Radio = FieldRadio;
Field.RadioGroup = FieldRadioGroup;
Field.Date = FieldDateCalendar;
Field.File = FieldFile;
Field.Mask = FieldMask;
Field.Select = FieldSelect;
Field.TextArea = FieldTextArea;
Field.Numeric = FieldNumeric;
Field.Control = FieldControl;

export default Field;
