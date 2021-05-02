import Head from 'next/head'
import Link from 'next/link';
import Container from '../components/container'
import Layout from '../components/layout'
import TopHeadBox from '../components/TopHeadBox'
import IndexRow from './IndexRow'
import LibCommon from '../lib/LibCommon'
import LibPagenate from '../lib/LibPagenate'

export default function Index(data) {
  var items = data.blogs
  var json = data.json
// console.log( items )    
  return (
    <div className="bg-gray-100">
    <Layout preview="">
      <Head>
        <title>{data.site_name}</title>
      </Head>
      <TopHeadBox site_name={data.site_name} info_text={data.info_text} />
      <Container key="Index">
        <div className="p-1">
          <h3 className="text-3xl myblog_color_accent font-bold mb-0">Posts</h3>
        </div>        
        {items.map((item, index) => {
// console.log(item )
          return (
          <Link href={`/posts/${item.ID}`} >
            <a>
              <IndexRow key={item.ID}
              id={item.ID} save_id={item.ID} title={item.post_title}
              date={item.post_date} category_name={item.category_name} />       
            </a>
          </Link>
          )
        })}
      </Container>
    </Layout>

    </div>
  )
}

export async function getStaticProps() {
  var url = process.env.BASE_URL+`/api/posts.php?page=1`
  const res = await fetch( url );
  var blogs = await res.json();
//console.log(categories)
  LibPagenate.init()
  var display = LibPagenate.is_paging_display(blogs.length)      
  return {
    props : {
      blogs: blogs,
      site_name : process.env.MY_SITE_NAME,
      info_text : "Sample CMSの関連記事を公開予定しております。",        
      display: display
    }
  };
}
