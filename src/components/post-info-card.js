import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import logo from '../images/logo.png';
import ccby from '../images/license/cc-by';
import ccbync from '../images/license/cc-by-nc';
import pd from '../images/license/pd';
import Svg from './svg';

const license = {
  'CC BY 4.0': {
    markup: (
      <a href="https://creativecommons.org/licenses/by/4.0/deed.ko">
        크리에이티브 커먼즈 저작자표시 4.0 국제 라이선스
      </a>
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
    <footer>
      {license[licenseKey] && license[licenseKey].svgProps && (
        <Svg {...license[licenseKey].svgProps} />
      )}
      <p>
        {strings[0]}
        {license[licenseKey] && license[licenseKey].markup
          ? license[licenseKey].markup
          : `${licenseKey} 라이선스`}
        {strings[1]}
      </p>
    </footer>
  );
};

const PostInfoCard = ({ post, code }) => {
  return (
    <section>
      <div>
        <img src={logo} alt="로고" width={32} height={32} />
        <p>
          <a href="https://github.com/leeye51456">leeye51456</a>
        </p>
      </div>
      {getLicenseMarkup`이 저작물은 ${post}에 따라 이용할 수 있습니다.`}
      {getLicenseMarkup`게시물 내 별도 라이선스 표기가 없는 코드는 ${code}에 따라 이용할 수 있습니다.`}
    </section>
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
