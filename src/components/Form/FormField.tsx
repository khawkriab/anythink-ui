import classNames from 'classnames';
import React from 'react';

type TSubmitterByButton = { id: string; value?: string };

interface IFormField extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  className?: string;
  onSubmitForm?: (event: any, submitterByButton: TSubmitterByButton) => void;
  onHandleValid?: (never: boolean) => void;
  onValidateChange?: (never: boolean) => void;
}

function FormField({
  className,
  onSubmitForm = () => null,
  onHandleValid = () => null,
  onValidateChange = () => null,
  ...props
}: Readonly<IFormField>) {
  const formRefs = React.useRef<HTMLFormElement>(null!);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      formRefs.current.classList.add('was-validated');
      // callback
      onHandleValid(true);

      event.stopPropagation();
    } else {
      let _submitterByButton = { id: '', value: '' };

      if (event.nativeEvent.submitter) {
        // if (event.submitter && (event.submitter.id || event.submitter.value)) {
        //   _submitterByButton = { ..._submitterByButton, id: event.submitter.id, value: event.submitter.value };
        // }
        if (event.nativeEvent.submitter && event.nativeEvent.submitter.id) {
          _submitterByButton = {
            ..._submitterByButton,
            id: event.nativeEvent.submitter.id,
            // value: event.nativeEvent.submitter?.value,
          };
        }
      }

      onSubmitForm(event, _submitterByButton);
    }
  };

  const onCheckValidate = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      onValidateChange(false);
    } else {
      onValidateChange(true);
    }
  };

  return (
    <form
      {...props}
      className={classNames(className)}
      noValidate
      ref={formRefs}
      onChange={onCheckValidate}
      onSubmit={handleSubmit}
    />
  );
}

export default FormField;
