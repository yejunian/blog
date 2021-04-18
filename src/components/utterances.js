import React, { createRef, useLayoutEffect } from 'react';

const Utterances = () => {
  const containerRef = createRef();

  useLayoutEffect(() => {
    const script = document.createElement('script');

    const attributes = {
      src: 'https://utteranc.es/client.js',
      repo: 'leeye51456/blog-comment',
      'issue-term': "pathname",
      label: 'comment',
      theme: 'github-light',
      crossorigin: 'anonymous',
      async: true,
    };

    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <section ref={containerRef} />
  )
};

export default Utterances;
