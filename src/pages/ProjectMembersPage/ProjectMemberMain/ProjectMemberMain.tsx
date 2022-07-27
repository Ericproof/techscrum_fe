import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProjectMemberMain.module.scss';
import { IUserInfo, IRole } from '../../../types';

interface Props {
  members: IUserInfo[];
  roles: IRole[];
  onChangeProjectRole: (e: React.ChangeEvent<HTMLSelectElement>, userId: string) => void;
  onClickRemove: (userId: string) => void;
}

export default function ProjectMemberMain({
  members,
  roles,
  onChangeProjectRole,
  onClickRemove
}: Props) {
  const { projectId = '' } = useParams();
  return (
    <div className={styles.projectMemberMainContainer}>
      <table aria-label="Projects details">
        <thead>
          <tr>
            <th className={styles.names}>
              <span>Name</span>
            </th>
            <th className={styles.email}>
              <span>Email</span>
            </th>
            <th className={styles.role}>
              <span>Role</span>
            </th>
            <th className={styles.buttons}>
              <span />
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            return (
              <tr key={member.id}>
                <th className={styles.name}>
                  <img src={member.avatarIcon} alt="avatar" />
                  <span>{member.name}</span>
                </th>
                <th className={styles.email}>
                  <span>{member.email ?? '-'}</span>
                </th>
                <th className={styles.role}>
                  <span>
                    <select
                      value={
                        member?.projectsRoles?.find(
                          (projectRole) => projectRole.projectId === projectId
                        )?.roleId ?? ''
                      }
                      onChange={(e) => {
                        onChangeProjectRole(e, member.id ?? '');
                      }}
                    >
                      {roles.map((role: IRole) => {
                        return (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        );
                      })}
                    </select>
                  </span>
                </th>
                <th className={styles.buttons}>
                  <button
                    onClick={() => {
                      onClickRemove(member.id ?? '');
                    }}
                  >
                    Remove Member
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
