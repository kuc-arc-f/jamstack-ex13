import Link from 'next/link';
import Head from 'next/head';
//
export default function Page(){
  return (
  <div className="navigate_wrap myblog_bgcolor_sub">
    <div className="container mx-auto px-8">
      <div className="head_menu_wrap py-3">
        <Link href="/" ><a>
          <span className="text-3xl text-white"><i className="fas fa-home"></i>
          </span>
        </a>
        </Link>
      </div>
    </div>
  </div>
  );
}
