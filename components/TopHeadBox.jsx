import Link from 'next/link';
import Head from 'next/head';
//
export default function TopHeadBox(props){
  var site_name = props.site_name
  return (
  <div className="main_title_wrap mb-3">
    <div className="div_img_layer myblog_bgcolor_main text-center text-white shadow-lg">
      <h1 className="text-5xl font-bold">{site_name}<br />
      </h1>
      <p className="sub_title m-4">{props.info_text}
        <br />
      </p>
    </div>
    <style>{`
    .div_img_layer{
      padding: 2rem 1rem;
      margin: 0.5rem 1rem;
      border-radius: 0.5rem;
    }
    `}</style> 
  </div>
  );
}
