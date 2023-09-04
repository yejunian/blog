const emptyValue = '__EMPTY';

const joinKeywords = (
  keywords: readonly unknown[] | unknown[] | null | undefined,
) =>
  (keywords ?? []).reduce((acc: string, value: unknown) => {
    if (value === '' || value === emptyValue) {
      return acc;
    } else if (acc === '') {
      return `${value}`;
    } else {
      return `${acc}, ${value}`;
    }
  }, '');

export default joinKeywords;
