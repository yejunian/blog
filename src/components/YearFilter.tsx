import { Link } from 'gatsby';
import React from 'react';

import * as styles from './YearFilter.module.scss';

type YearFilterProps = {
  availableYears?: (number | string)[];
  categoryId?: string;
  selectedYear?: number | string;
};

const YearFilter = ({
  availableYears,
  categoryId,
  selectedYear,
}: YearFilterProps) => {
  const basePath = categoryId ? `/category/${categoryId}` : `/post`;

  return (
    <div className={styles.root}>
      <Link
        className={selectedYear ? undefined : styles.selected}
        to={`${basePath}/`}
      >
        최근
      </Link>
      {availableYears?.map((year) => (
        <Link
          key={year}
          className={selectedYear === year ? styles.selected : undefined}
          to={`${basePath}/${year}/`}
        >
          {year}
        </Link>
      ))}
    </div>
  );
};

export default YearFilter;
