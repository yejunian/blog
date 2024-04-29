import { Link } from 'gatsby';
import React from 'react';

import logo from '../images/logo.svg';
import * as styles from './Footer.module.scss';

const currentYear = new Date().getFullYear();

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
          &copy; 2022-{currentYear}{' '}
          <a href="https://github.com/yejunian">yejunian</a>
        </p>
        <p className={styles.bright}>
          라이선스를 따로 명시하지 않았다면, 각 콘텐츠에는 아래와 같은
          라이선스가 적용됩니다.
        </p>
        <ul className={styles.bright}>
          <li>
            <a href="https://github.com/yejunian/blog-post">
              yejunian/blog-post
            </a>
            에 업로드한 게시물(코드 블록 제외):{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/deed.ko">
              CC-BY 4.0
            </a>
          </li>
          <li>게시물에 삽입된 코드 블록의 내용: 퍼블릭 도메인</li>
          <li>
            댓글 등, 웹 사이트 방문자가 작성한 게시물의 저작권은 그 콘텐츠의
            작성자에게 있으며, 이를 활용하려면 저작권자의 이용허락이 필요합니다.
          </li>
        </ul>
        <p className={styles.bright}>
          게시물에 포함된 이미지 등을 외부 서비스에서 사용하려면, 해당 콘텐츠를
          다운로드한 뒤 공유하려는 서비스의 콘텐츠 첨부 기능을 활용하기
          바랍니다. 이 사이트에 첨부한 파일의 URL은 언제든지 변경될 수 있습니다.
        </p>
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
);

export default Footer;
