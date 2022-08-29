import Image from "next/image";
import React from "react";
import { SWRConfig } from "swr";
import Layout from "../../components/Layout";
import Author from "../../components/_child/Author";
import Error from "../../components/_child/Error";
import Related from "../../components/_child/Related";
import Spinner from "../../components/_child/Spinner";
import getPosts from "../../library/dataRoutes";
import fetcher from "../../library/fetcher";
import { useRouter } from "next/router";
export default function Page({ fallback }) {
  const router = useRouter();
  const { postId } = router.query;
  const { data, isLoading, isError } = fetcher(`api/posts/${postId}`);

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <SWRConfig value={{ fallback }}>
      <Article {...data} />
    </SWRConfig>
  );
}

function Article({ title, img, subtitle, description, author }) {
  return (
    <Layout>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          {author ? <Author {...author} /> : <></>}
        </div>

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

export async function getStaticProps({ params }) {
  const posts = await getPosts(params.postId);

  return {
    props: {
      fallback: {
        "/api/posts": posts,
      },
    },
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
