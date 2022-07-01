import axios from 'axios';
import { AccountSettingForm } from './entity/accountSetting';
import config from '../../config/config';

const changePassword = async (accountSettingFrom: AccountSettingForm) => {
  const path = `${config.apiAddress}/account`;
  const result = await axios.patch(path, { ...accountSettingFrom });
  return result;
};

export default changePassword;
