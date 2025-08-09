declare module 'remark-heading-id' {
  const remarkHeadingId: (options?: {
    defaults?: boolean;
  }) => (node: unknown) => void;
  export default remarkHeadingId;
}

declare module '*.scss';

declare module '*.svg' {
  const url: string;
  export default url;
}

declare module '*.jpg' {
  const url: string;
  export default url;
}
declare module '*.png' {
  const url: string;
  export default url;
}
declare module '*.webp' {
  const url: string;
  export default url;
}

declare module '*.mp4' {
  const url: string;
  export default url;
}
declare module '*.webm' {
  const url: string;
  export default url;
}
