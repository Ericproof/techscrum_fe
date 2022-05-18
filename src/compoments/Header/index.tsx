import React from 'react';
import {
  AiOutlineFieldTime,
  AiFillCopy,
  AiOutlineBarChart,
  AiOutlineLaptop,
  AiOutlineUserAdd,
  AiFillFund,
  AiOutlineDesktop,
  AiOutlineWechat,
  AiFillAliwangwang,
  AiFillMediumCircle,
  AiOutlineDisconnect,
  AiOutlineTeam,
  AiOutlineFundProjectionScreen,
  AiOutlineShoppingCart,
  AiTwotoneSwitcher,
  AiOutlineAliwangwang,
  AiFillProfile,
  AiOutlineApartment,
  AiFillSignal,
  AiOutlineDingding,
  AiFillVideoCamera,
  AiFillRedditCircle,
  AiOutlineRocket,
  AiTwotoneExperiment,
  AiOutlineDown,
  AiOutlineMenu,
  AiOutlineClose
} from 'react-icons/ai';
import styles from './index.module.scss';
import icon from './icon.png';

export default function Header() {
  return (
    <nav>
      <div className={styles.container}>
        <img src={icon} alt="TeamScrumIcon" />
        <div className={styles.serviceListTabs}>
          <div>
            <a href="/#">
              Platform
              <AiOutlineDown />
            </a>
            <div className={styles.subNavThreeColumns}>
              <div className={styles.serviceContainerThreeColumns}>
                <div className={styles.left}>
                  <h1>overview</h1>
                  <div>
                    <div>
                      <a href="/#">
                        <h2>Product tour</h2>
                        <p>Designed for your entire team</p>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <h2>Integrations</h2>
                        <p>Connect to your essential tools</p>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <h2>Customers</h2>
                        <p>See how teams leverage Teamwork</p>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <h2>Comparisions</h2>
                        <p>How Teamwork Compares to the rest</p>
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.middle}>
                  <h1>Features</h1>
                  <div>
                    <div>
                      <a href="/#">
                        <AiOutlineFieldTime />
                        <div>
                          <h2>Resource Management</h2>
                          <p>Manage your team&apos;s short team and long term resources</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiFillCopy />
                        <div>
                          <h2>Templates</h2>
                          <p>Scale high-performance processes with tempaltes</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiOutlineBarChart />
                        <div>
                          <h2>Kanban boards</h2>
                          <p>Automate your workflow and visualiza project tasks</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiOutlineLaptop />
                        <div>
                          <h2>Time Tracking</h2>
                          <p>Deliver a more collaborative client experience</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiOutlineUserAdd />
                        <div>
                          <h2>Unlimited client users</h2>
                          <p>Deliver a more collaborative client experience</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiFillFund />
                        <div>
                          <h2>Profitability</h2>
                          <p>Manage your budget and track profitability</p>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className={styles.space} />
                  <a className={styles.pinkBtn} href="/#">
                    see all features &gt;
                  </a>
                </div>
                <div className={styles.right}>
                  <h1>platform add-one</h1>
                  <div>
                    <div>
                      <a href="/#">
                        <AiOutlineDesktop />
                        <div>
                          <h2>Desk</h2>
                          <p>Helpdesk software</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiOutlineWechat />
                        <div>
                          <h2>Chat</h2>
                          <p>Video Chat software</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiFillAliwangwang />
                        <div>
                          <h2>CRM</h2>
                          <p>Sales CRM software</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiFillMediumCircle />
                        <div>
                          <h2>Spaces</h2>
                          <p>Document management</p>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className={styles.space} />
                  <a className={styles.blueBtn} href="/#">
                    see all products &gt;
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <a href="/#">
              Solutions
              <AiOutlineDown />
            </a>
            <div className={styles.subNavTwoColumns}>
              <div className={styles.serviceContainerTwoColumns}>
                <div className={styles.left}>
                  <h1>For</h1>
                  <div className={styles.leftServicesLists}>
                    <div>
                      <a href="/#">
                        <AiOutlineDisconnect />
                        <div>
                          <h2>Agencies</h2>
                          <p>Manage clients projects seamlessly with Teamwork</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiOutlineTeam />
                        <div>
                          <h2>Creative Teams</h2>
                          <p>Manage creative Projects smoothly with Teamwork</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiOutlineFundProjectionScreen />
                        <div>
                          <h2>Professional services</h2>
                          <p>Deliver better outcomes for your clients with Teamwork</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiOutlineShoppingCart />
                        <div>
                          <h2>Marketing Teams</h2>
                          <p>Manage multiple complex client projects with ease</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiTwotoneSwitcher />
                        <div>
                          <h2>Product Teams</h2>
                          <p>Easily manage and execute on product requirements</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiOutlineAliwangwang />
                        <div>
                          <h2>PMO teams</h2>
                          <p>Everything you need to deliver projects on time and on budget</p>
                        </div>
                      </a>
                    </div>
                  </div>
                  <a className={styles.pinkBtn} href="/#">
                    see use cases &gt;
                  </a>
                </div>
                <div className={styles.right}>
                  <h1>use cases</h1>
                  <div className={styles.rightServicesLists}>
                    <a href="/#">
                      Remote work <span>Popular</span>
                    </a>
                    <a href="/#">Task management</a>
                    <a href="/#">Client work</a>
                    <a href="/#">Project planning</a>
                    <a href="/#">Resources management</a>
                    <a href="/#">Project collaboration</a>
                  </div>
                  <a className={styles.blueBtn} href="/#">
                    see use cases &gt;
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <a href="/#">Pricing</a>
          </div>
          <div>
            <a href="/#">
              Resources
              <AiOutlineDown />
            </a>
            <div className={styles.subNavTwoColumns}>
              <div className={styles.serviceContainerTwoColumns}>
                <div className={styles.left}>
                  <h1>Learning</h1>
                  <div className={styles.leftServicesLists}>
                    <div>
                      <a href="/#">
                        <AiFillProfile />
                        <div>
                          <h2>
                            Teamwork blog <span>Popular</span>
                          </h2>
                          <p>Browse the latest project management best practices</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiOutlineApartment />
                        <div>
                          <h2>Webinars</h2>
                          <p>Join our experts for live Q&A, tops and best practices</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiFillSignal />
                        <div>
                          <h2>Resource Center</h2>
                          <p>Insights, tops, and festures to your team</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiFillVideoCamera />
                        <div>
                          <h2>Videos</h2>
                          <p>Watch our videos on our insights. tops and new features</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiFillRedditCircle />
                        <div>
                          <h2>Support center</h2>
                          <p>Stuck on something with Teamwork? We&apos;re happy to help</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiOutlineApartment />
                        <div>
                          <h2>Partners</h2>
                          <p>Become a Teamwork partner or find one near you</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiOutlineDingding />
                        <div>
                          <h2>Affiliates</h2>
                          <p>Become a Teamwork affiliate today to grow your income</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiOutlineRocket />
                        <div>
                          <h2>Success Center</h2>
                          <p>Set your team-and your clients-up for success</p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a href="/#">
                        <AiTwotoneExperiment />
                        <div>
                          <h2>Guilde</h2>
                          <p>The Teamwork guild to project management</p>
                        </div>
                      </a>
                    </div>
                  </div>
                  <a className={styles.pinkBtn} href="/#">
                    see use cases &gt;
                  </a>
                </div>
                <div className={styles.right}>
                  <h1>templates</h1>
                  <div className={styles.rightServicesLists}>
                    <a href="/#">Client Onboarding</a>
                    <a href="/#">Website Project Plan</a>
                    <a href="/#">Marketing Campaign</a>
                    <a href="/#">Content Plan</a>
                    <a href="/#">Public Relations Plan</a>
                    <a href="/#">Event Planning Template</a>
                  </div>
                  <div className={styles.space} />
                  <a className={styles.blueBtn} href="/#">
                    see use cases &gt;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.space} />
        <div className={styles.functionsLoginTabs}>
          <a href="/#">Book a Demo</a>
          <a href="/#">Login</a>
          <a className={styles.btn} href="/#">
            Try it to free
          </a>
        </div>
        <div className={styles.menuBar}>
          <AiOutlineMenu />
          <AiOutlineClose />
        </div>
      </div>
      <div className={styles.blurBackground} />
    </nav>
  );
}
