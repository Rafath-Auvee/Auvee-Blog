import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "./../components/Header";
import { sanityClient, urlFor } from "../sanity";
import Link from "next/link";
import { Post } from "../typings";
import Logo from "./../assets/img/horizontalLogo.webp";

interface Props {
  posts: [Post];
}

function Home({ posts }: Props) {
  // console.log(posts);

  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Wrexa Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex justify-between items-center bg-[#0c0f16] text-white border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="max-w-xl font-serif text-6xl">
            At
            <span className="ml-2 underline decoration-white decoration-4">
              Wrexa,
            </span>{" "}
            We create award-winning websites,
          </h1>
          <h2>
            remarkable brands and cutting-edge apps. Industry leading Metaverse
            games, colaborate with leading Gaming companies to come up with AAA
            title games.
          </h2>
        </div>
        <img
          className="hidden md:inline-flex h-72 lg:h-[600px]"
          src="https://i.ibb.co/dP6Xww2/logo2.png"
          alt=""
        />
      </div>

      {/* post */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-5 md:p-6">
        {posts.reverse().map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden h-full">
              <img
                src={urlFor(post.mainImage).url()!}
                alt=""
                className="h-96 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold mb-5">{post.title}</p>
                  <p className="text-sm">{post.description}</p>
                  <div>
                    Author:{" "}
                    <span className="font-bold">{post.author.name}</span>
                  </div>
                </div>
                <img
                  src={urlFor(post.author.image).url()!}
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    author-> {
     name,
     image
    },
    description,
    mainImage,
    slug
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
