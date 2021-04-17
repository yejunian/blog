import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import logo from '../images/logo-3x.png';
import ccby from '../images/license/cc-by';
import ccbync from '../images/license/cc-by-nc';
import pd from '../images/license/pd';
import Svg from './svg';
import * as css from './post-info-card.module.css';

const license = {
  'CC BY 4.0': {
    markup: (
      <a href="https://creativecommons.org/licenses/by/4.0/deed.ko">크리에이티브 커먼즈 저작자표시 4.0 국제 라이선스</a>
    ),
    svgProps: ccby,
  },
  'CC BY-NC 4.0': {
    markup: (
      <a href="https://creativecommons.org/licenses/by-nc/4.0/deed.ko">
        크리에이티브 커먼즈 저작자표시-비영리 4.0 국제 라이선스
      </a>
    ),
    svgProps: ccbync,
  },
  MIT: {
    markup: <Link to="/license/mit/">MIT 라이선스</Link>,
  },
  'The Unlicense': {
    markup: <a href="https://unlicense.org/">The Unlicense</a>,
    svgProps: pd,
  },
};

const getLicenseMarkup = (strings, licenseKey) => {
  if (!licenseKey) {
    return;
  }

  return (
    <section className={css.postFooterItem}>
      {license[licenseKey] && license[licenseKey].svgProps && <Svg {...license[licenseKey].svgProps} />}
      <p>
        {strings[0]}
        {license[licenseKey] && license[licenseKey].markup ? license[licenseKey].markup : `${licenseKey} 라이선스`}
        {strings[1]}
      </p>
    </section>
  );
};

const PostInfoCard = ({ post, code }) => {
  return (
    <footer className={css.postFooter}>
      <section className={css.postFooterItem}>
        <img className={css.logo} src={logo} alt="로고" width={32} height={32} />
        <p>
          leeye51456
          <br />
          <a href="https://github.com/leeye51456">GitHub 프로필</a>
          {' | '}
          <Link to="/">블로그</Link>
        </p>
      </section>
      {getLicenseMarkup`이 저작물은 ${post}에 따라 이용할 수 있습니다.`}
      {getLicenseMarkup`게시물 내 별도 라이선스 표기 없이 게재된 컴퓨터프로그램저작물은 ${code}에 따라 이용할 수 있습니다.`}
      <section className={css.postFooterItem}>
        <p>라이선스를 명시하지 않은 콘텐츠의 이용, 명시한 라이선스 범위 밖의 이용은 별도 문의 바랍니다.</p>
      </section>
    </footer>
  );
};

PostInfoCard.propTypes = {
  post: PropTypes.string,
  code: PropTypes.string,
};

PostInfoCard.defaultProps = {
  post: '',
  code: '',
};

export default PostInfoCard;
