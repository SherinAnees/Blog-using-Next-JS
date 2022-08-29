import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";
import Author from "../../components/_child/Author";
import Related from "../../components/_child/Related";
import getPosts from "../../library/dataRoutes";

function Page({ title, img, subtitle, description, author }) {
  return (
    <Layout>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">{author ? <Author /> : <></>}</div>

        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            {title || "No Title"}
          </h1>

          <p className="text-gray-500 text-xl text-center">
            {subtitle || "No Subtitle"}
          </p>

          <div className="py-10">
            <Image src={img || ""} width={900} height={600}></Image>
          </div>

          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            <p>{description}</p>
          </div>
        </div>

        <Related />
      </section>
    </Layout>
  );
}

export default Page;
export async function getStaticProps({ params }) {
  const posts = await getPosts(params.postId);

  return {
    props: posts,
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = posts.map((value) => {
    return {
      params: {
        postId: value.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
