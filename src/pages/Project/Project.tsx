import React from 'react';
import styles from './Project.module.scss';

export default function Project() {
  return (
    <div className={styles.projectPage}>
      <div className={styles.projectContainer}>
        <div className={styles.projectContent}>
          <div className={styles.header}>
            <div className={styles.title}>
              <h1>Projects</h1>
              <button type="button">Create project</button>
            </div>
            <div className={styles.searchBar}>
              <input />
              <span>
                <svg />
              </span>
            </div>
          </div>
          <div className={styles.mainContent}>
            <table aria-label="Projects details">
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.stars}>
                    <span>
                      <svg />
                    </span>
                  </th>
                  <th className={styles.names}>
                    <span>Name</span>
                  </th>
                  <th className={styles.keys}>
                    <span>Key</span>
                  </th>
                  <th className={styles.types}>
                    <span>Type</span>
                  </th>
                  <th className={styles.leads}>
                    <span>Lead</span>
                  </th>
                  <th className={styles.buttons}>
                    <span />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.example}>
                  <td className={styles.star}>
                    <div className={styles.changeStar}>
                      <span>
                        <button type="button" className={styles.starBtn}>
                          <div className={styles.starStyle}>
                            <span>
                              <svg />
                            </span>
                          </div>
                        </button>
                      </span>
                    </div>
                  </td>
                  <td className={styles.name}>
                    <a className={styles.nameContainer} href="">
                      <div className={styles.nameContent}>
                        <img
                          src="https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10418"
                          alt="icon"
                        />
                        <span className={styles.exampleName}>example</span>
                      </div>
                    </a>
                  </td>
                  <td className={styles.key}>
                    <span className={styles.keyName}>EX</span>
                  </td>
                  <td className={styles.type}>
                    <div className={styles.typeContent}>
                      <span className={styles.typeName}>Team-managed software</span>
                    </div>
                  </td>
                  <td className={styles.lead}>
                    <div className={styles.leadContainer}>
                      <div className={styles.leadContent}>
                        <a href="">
                          <div className={styles.leadInfo}>
                            <div className={styles.avatar}>
                              <span>
                                <img alt="avatar" />
                              </span>
                            </div>
                            <span className={styles.leadName}>Evan Lin</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className={styles.button} />
                </tr>
                <tr className={styles.project}>
                  <td className={styles.star}></td>
                  <td className={styles.name}></td>
                  <td className={styles.key}></td>
                  <td className={styles.type}></td>
                  <td className={styles.lead}></td>
                  <td className={styles.button}></td>
                </tr>
                <tr className={styles.template}>
                  <td className={styles.star}></td>
                  <td className={styles.name}></td>
                  <td className={styles.key}></td>
                  <td className={styles.type}></td>
                  <td className={styles.lead}></td>
                  <td className={styles.button}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
