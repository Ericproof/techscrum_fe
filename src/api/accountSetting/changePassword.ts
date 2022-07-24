import axios from 'axios';
import { AccountSettingForm } from './entity/accountSetting';
import config from '../../config/config';

const changePassword = async (accountSettingFrom: AccountSettingForm) => {
  const path = `${config.apiAddress}/account`;

  const configHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}`
    }
  };

  const data = {
    ...accountSettingFrom
  };

  const result = await axios.patch(path, data, configHeader);
  return result;
};

export default changePassword;
