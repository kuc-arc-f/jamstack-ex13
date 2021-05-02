import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import marked from  'marked'

import Container from '../../components/container'
import Layout from '../../components/layout'
//
export default function Page({ blog }) {
  var categories = blog.categories
//console.log(categories)
  return (
  <div className="bg-gray-100">
    <Layout>
    <Head><title key="title">{blog.post_title}</title></Head>
    <Container key={blog.ID}>
      <Link href="/" >
        <a>
        <button className="btn-outline-blue my-2">Back</button>
        </a>
      </Link>
      <hr className="my-2" />
      <div className="show_head_wrap text-gray-900 font-bold text-2xl mb-1">
        <i className="fas fa-home"></i> >
        <span className="mx-2">{blog.post_title}</span>
      </div>
      <hr className="my-2" />
      <div className="show_title_wrap bg-white shadow-lg rounded-lg">
        <h1 className="text-gray-900 font-bold text-5xl my-2 mx-2">{blog.post_title}</h1>
        <p>Date: {blog.post_date}</p>
        <p>Category :
        {categories.map((item, index) => {
    // console.log(item.show_id ,item.created_at )
          return (<span key={index} > {item.name} , </span>) 
        })}
        </p>
      </div>
      <div className="show_body_wrap bg-white shadow-lg rounded-lg">
        <div id="post_item" dangerouslySetInnerHTML={{__html: `${blog.post_content}`}}></div>
      </div>
    </Container>      
    <style>{`
      div#post_item > p > img{
        max-width : 100%;
        height : auto;
      }
      div#post_item > hr {
        height: 1px;
        background-color: #000;
        border: none;
        margin: 1rem 0rem;
      }
      div#post_item > ul{
        list-style-type: disc;
        margin: 1rem 1rem;
      }
      div#post_item > h1{
        font-size: 3rem;
        font-weight: bold;
      }
      div#post_item > h3{
        font-size: 1.5rem;
        font-weight: bold;
      }
      .show_title_wrap{padding : 0.5rem;}
      .show_body_wrap{
        padding : 0.5rem;
        margin: 1rem 0rem;
      }
      .show_head_wrap{ font-size: 1.4rem; }
      `}</style>      
  </Layout>
  </div>
  )
}
//
export const getStaticPaths = async () => {
  const res = await fetch(
    process.env.BASE_URL + `/api/posts.php`
  );
  const repos = await res.json();
  var paths = []
  repos.map((item, index) => {
    var row = { params: 
      { id: String(item.ID) } 
    }
    paths.push(row)
  })
// console.log(paths)
  return {
    paths: paths,
    fallback: false
  } 
};
export const getStaticProps = async context => {
  const postId = context.params.id
  var url = process.env.BASE_URL + `/api/postone.php?id=${postId}`
// console.log(url)
  const res = await fetch( url);
  var blog = await res.json(); 
  var item = blog[0]
  item.content = marked(item.post_content)
//console.log(item.categories)
  return {
    props: { 
      blog: item,
      category_name: ""
    },
  }
  
};

