import DocumentHead from '../components/document-head'
import ExtLink from '../components/ext-link'
import styles from '../styles/page.module.css'

const RenderPage = () => (
  <div className={styles.container}>
    <DocumentHead />

    <div>
      <h2>このブログについて</h2>
      <p>ライフハックが好きな社会人、ぶんかいと申します。</p>
      <p>最近はZettelkastenというメモテクニックを個人的に研究中です。</p>
      <p>
        便利ツールやちょっと生活を便利にする術など投稿したいなと思ってます。
      </p>
      <h2>アカウント</h2>
      <p>
        <ExtLink href="https://twitter.com/bunkaich">Twitter</ExtLink>
      </p>
    </div>
  </div>
)

export default RenderPage
