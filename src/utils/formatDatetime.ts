type FormatDatetimeOptions = {
  withHours?: boolean;
};

const formatDatetime = (
  iso8601utc: string,
  options?: FormatDatetimeOptions,
): string => {
  const dateObject = new Date(iso8601utc);
  dateObject.setUTCHours(dateObject.getUTCHours() + 9);

  const year = dateObject.getUTCFullYear();
  const month = dateObject.getUTCMonth() + 1;
  const date = dateObject.getUTCDate();
  const hours = dateObject.getUTCHours();

  const dateString = `${year}년 ${month}월 ${date}일`;

  return options?.withHours ? `${dateString} ${padHours(hours)}시` : dateString;
};

const padHours = (hours: number) => (hours < 10 ? `0${hours}` : `${hours}`);

export default formatDatetime;
