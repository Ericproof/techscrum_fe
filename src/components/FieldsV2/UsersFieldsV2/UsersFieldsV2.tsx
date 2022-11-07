import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../api/user/user';
import DropdownV2 from '../../FormV2/DropdownV2/DropdownV2';

interface IUsersV2 {
  onChange: (e: any) => void;
  defaultValue: string | null;
  label: string;
  name: string;
}

export default function UsersV2(props: IUsersV2) {
  const { onChange, defaultValue, name, label } = props;
  const [userList, setUserList] = useState<any>([]);

  useEffect(() => {
    const getUsersList = async () => {
      if (userList.length === 0) {
        const res = await getUsers();
        setUserList(res.data);
      }
    };
    getUsersList();
  }, [userList]);

  return (
    <DropdownV2
      label={label}
      onValueChanged={onChange}
      onValueBlur={() => {}}
      defaultValue={defaultValue}
      name={name}
      required
      options={userList.map((item) => {
        return {
          label: item.name,
          value: item.id
        };
      })}
    />
  );
}
