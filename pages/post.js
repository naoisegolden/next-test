import {withRouter} from 'next/router'
import Layout from '../components/Layout.js'

const Content = withRouter(props => (
  <>
    <h1>{props.router.query.title}</h1>
    <p>This is the blog post content.</p>
  </>
))

const Page = props => (
    <Layout>
       <Content />
    </Layout>
)

export default Page
