import axios from 'axios';
import { DeleteAccountForm } from './entity/accountSetting';
import config from '../../config/config';

const deleteAccount = async (deleteAccountForm: DeleteAccountForm) => {
  const path = `${config.apiAddress}/account`;
  const result = await axios.delete(path, { data: { ...deleteAccountForm } });
  return result;
};

export default deleteAccount;
