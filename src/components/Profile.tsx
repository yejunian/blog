import React from 'react'

import author from '../images/author.svg'

import * as styles from './Profile.module.scss'

const Profile = () => {
  return (
    <div className={styles.root}>
      <div className={styles.titleLine}>
        <h1 className={styles.title}>
          <img
            className={styles.logo}
            alt="yejunian"
            src={author}
            width={91}
            height={26}
          />
        </h1>
        <div className={styles.more}>
          <a href="https://github.com/yejunian">GitHub</a>
        </div>
      </div>

      <p className={styles.description}>
        컴퓨터공학, 웹 프론트엔드를 중심으로 이것저것 공부하는 나부랭이.
      </p>
    </div>
  )
}

export default Profile
