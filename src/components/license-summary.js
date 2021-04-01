import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import ccby from '../images/license/cc-by';
import pd from '../images/license/pd';
import Svg from './svg';

const license = {
  'CC-BY 4.0': {
    markup: (
      <a href="https://creativecommons.org/licenses/by/4.0/deed.ko">
        크리에이티브 커먼즈 저작자표시 4.0 국제 라이선스
      </a>
    ),
    svgProps: ccby,
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
    <div>
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
    </div>
  );
};

const LicenseSummary = ({ post, code }) => {
  return (
    <section>
      <div>
        작성자: <a href="https://github.com/leeye51456">leeye51456</a>
      </div>
      {getLicenseMarkup`이 저작물은 ${post}에 따라 이용할 수 있습니다.`}
      {getLicenseMarkup`게시물 내 별도 라이선스 표기가 없는 코드는 ${code}에 따라 이용할 수 있습니다.`}
    </section>
  );
};

LicenseSummary.propTypes = {
  post: PropTypes.string,
  code: PropTypes.string,
};

LicenseSummary.defaultProps = {
  post: '',
  code: '',
};

export default LicenseSummary;
