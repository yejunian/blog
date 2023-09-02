import { HeadFC, HeadProps } from 'gatsby'
import React from 'react'

import Seo from '../../components/head/Seo'
import PostListLayout from '../../components/PostListLayout'

import * as styles from '../GeneralPage.module.scss'

const CategoryListPage = () => (
  <PostListLayout
    mainClassName={styles.root}
    showCategoryList={true}
    showPostList={false}
  />
)

export const Head: HeadFC = ({ location }: HeadProps) => (
  <Seo
    canonicalPath={
      location.pathname.endsWith('/')
        ? location.pathname
        : `${location.pathname}/`
    }
    title="분류 목록"
    noindex={true}
  />
)

export default CategoryListPage
