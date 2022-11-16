import DocumentHead from '../../components/document-head'
import Link from 'next/link'
import {
  BlogPostLink,
  BlogTagLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  NoLinkTags,
  PostTitle,
  ReadMoreLink,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
} from '../../lib/notion/client'
import {
  getBlogLink,
} from '../../lib/blog-helpers'

export async function getStaticProps() {
  const [posts, firstPost, rankedPosts, tags] = await Promise.all([
    getPosts(),
    getFirstPost(),
    getRankedPosts(),
    getAllTags(),
  ])
  //console.log(posts)
  return {
    props: {
      posts,
      firstPost,
      rankedPosts,
      tags,
    },
    revalidate: 60,
  }
}

const RenderPosts = ({
  posts = [],
  firstPost,
  rankedPosts = [],
  tags = [],
}) => {
  return (
    <div className={styles.container}>
      <DocumentHead title="Blog" />

      <div className={styles.mainContent}>
        <NoContents contents={posts} />

        {posts.map(post => {
          const ogSlug = post.OGImage ? "/api/og-image/" + post.Slug : "/default.png"
          return (
            <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
              <a>
                <div className={styles.eachPost} key={post.Slug}>
                  <img
                    src={ogSlug}
                    alt="thumbnail"
                  />
                  <div className={styles.postContentWrap}>
                    <div className={styles.spaceBetween}>
                      <PostDate post={post} />
                      <NoLinkTags post={post} />
                    </div>
                    <PostTitle post={post} />
                  </div>
                </div>
              </a>
            </Link>
          )
        })}

        <footer>
          <NextPageLink firstPost={firstPost} posts={posts} />
        </footer>
      </div>

      <div className={styles.subContent}>
        <BlogPostLink heading="Recommended" posts={rankedPosts} />
        <BlogTagLink heading="Categories" tags={tags} />
      </div>
    </div>
  )
}

export default RenderPosts
