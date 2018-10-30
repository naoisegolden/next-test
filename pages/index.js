import Layout from '../components/Layout'
import Link from 'next/link'
import loadDB from '../lib/load-db'

const PostLink = props => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?id=${props.id}`}>
      <a>{props.title}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
)

const Index = ({ stories }) => (
  <Layout>
    <h1>Hacker News - Latest</h1>
    <ul>
      {stories.map(story => (
        <PostLink key={story.id} id={story.id} title={story.title} />
      ))}
    </ul>
    <style jsx>{`
      h1, a {
        font-family: "Arial";
      }
    `}</style>
  </Layout>
)

Index.getInitialProps = async () => {
  const db = await loadDB()

  const ids = await db.child('topstories').once('value')
  let stories = await Promise.all(
    ids.val().slice(0, 10).map(id => db
      .child('item')
      .child(id)
      .once('value')
    )
  )

  stories = stories.map(s => s.val())

  return { stories }
}

export default Index
