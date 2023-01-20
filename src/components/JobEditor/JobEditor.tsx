import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ButtonV2 from '../../lib/FormV2/ButtonV2/ButtonV2';
import InputV2 from '../../lib/FormV2/InputV2/InputV2';
import BtnContainer from '../../lib/Grid/BtnContainer/BtnContainer';
import Row from '../../lib/Grid/Row/Row';
import { IJobApplyEditor } from '../../types';
import styles from './JobEditor.module.scss';

interface JobEditorProps {
  redirectPage: React.Dispatch<React.SetStateAction<boolean>>;
  showCancelBtn?: boolean;
  onClickSend?: (data: IJobApplyEditor) => void;
  onClickCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hasError?: boolean;
  loading?: boolean;
}

function JobEditor(props: JobEditorProps) {
  const [data, setData] = useState<IJobApplyEditor>({
    fullName: '',
    company: '',
    workEmailAddress: '',
    phoneNumber: ''
  });

  useEffect(() => {}, [data]);
  const [workingEmail, setWorkingEmail] = useState('');

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateData = {
      fullName: e.target.value
    };
    setData({ ...data, ...updateData });
  };

  const onChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateData = {
      company: e.target.value
    };
    setData({ ...data, ...updateData });
  };

  const onChangeEmailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateData = {
      workEmailAddress: e.target.value
    };
    setWorkingEmail(e.target.value);
    setData({ ...data, ...updateData });
  };

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateData = {
      phoneNumber: e.target.value
    };
    setData({ ...data, ...updateData });
  };

  const {
    redirectPage,
    showCancelBtn = false,
    hasError,
    onClickSend = () => {},
    onClickCancel = () => {},
    loading
  } = props;

  const onSend = () => {
    if (workingEmail !== '') {
      redirectPage(true);
      onClickSend(data);
    } else {
      toast.error('Please type your work email address');
    }
  };

  return (
    <div className={styles.editSection}>
      <div className={styles.editContainer}>
        <form>
          <div>
            <Row defaultMargin>
              <InputV2
                name="full name"
                label="Full Name"
                dataTestId="full-name"
                onValueChanged={onChangeName}
              />
            </Row>
            <Row defaultMargin>
              <InputV2
                name="company"
                label="Company"
                dataTestId=""
                onValueChanged={onChangeCompany}
              />
            </Row>
            <Row defaultMargin>
              <InputV2
                name="work email address"
                label="Work Email Address"
                dataTestId=""
                onValueChanged={onChangeEmailAddress}
              />
            </Row>
            <Row defaultMargin>
              <InputV2
                name="phone number"
                label="Phone Number"
                dataTestId=""
                onValueChanged={onChangePhoneNumber}
              />
            </Row>
          </div>
          {hasError && (
            <p className={styles.error} data-testid="projectError">
              Error
            </p>
          )}
          <Row>
            <BtnContainer>
              <ButtonV2 text="Send" onClick={onSend} dataTestId="save" fill loading={loading} />
              {showCancelBtn && (
                <ButtonV2
                  text="Cancel"
                  onClick={onClickCancel}
                  dataTestId="cancel"
                  loading={loading}
                />
              )}
            </BtnContainer>
          </Row>
        </form>
      </div>
    </div>
  );
}

JobEditor.defaultProps = {
  showCancelBtn: false,
  onClickSend: () => {},
  onClickCancel: () => {},
  loading: false,
  hasError: false
};

export default JobEditor;
