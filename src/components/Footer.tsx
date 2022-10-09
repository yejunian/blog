import { Link } from 'gatsby'
import React from 'react'

import logo from '../images/logo.svg'

import * as styles from './Footer.module.scss'

const Footer = () => (
  <footer className={styles.root}>
    <div className={styles.contents}>
      <div className={styles.titleLine}>
        <h2 className={styles.title}>
          <Link to="/">
            <img
              className={styles.logo}
              alt="yejunian / blog"
              src={logo}
              width={113}
              height={18}
            />
          </Link>
        </h2>
      </div>

      <div className={styles.license}>
        <p>
          &copy; 2022 <a href="https://github.com/yejunian">yejunian</a>
        </p>
        <p className={styles.bright}>
          라이선스가 따로 명시되지 않았다면, 각 콘텐츠에는 아래와 같은
          라이선스가 적용됩니다.
        </p>
        <ul className={styles.bright}>
          <li>
            게시물(코드 블록 제외):{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/deed.ko">
              CC-BY 4.0
            </a>
          </li>
          <li>
            게시물 등에 삽입된 코드 블록(
            <code>
              &lt;pre&gt;&lt;code&gt;&hellip;&lt;/code&gt;&lt;/pre&gt;
            </code>
            )의 내용: 퍼블릭 도메인
          </li>
          <li>
            댓글 등, 타인이 작성한 게시물의 저작권은 각 게시물의 작성자에게
            있습니다.
          </li>
        </ul>
      </div>

      <div className={styles.source}>
        <p>
          Powered by{' '}
          <a
            href="https://www.gatsbyjs.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Gatsby
          </a>
          . Hosted on{' '}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
