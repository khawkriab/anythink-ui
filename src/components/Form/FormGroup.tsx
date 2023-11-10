import React from 'react';
import Col, { ICol } from '../Grid/Col';

export interface IFormGroup extends ICol {}

function FormGroup(props: IFormGroup) {
  return <Col as="fieldset" {...props} />;
}

export default FormGroup;
