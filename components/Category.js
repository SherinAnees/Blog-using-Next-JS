import Author from "./_child/Author";
import Link from "next/link";
import Image from "next/image";
import fetcher from "../library/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";

export default function Category() {
  //fetch data using SWR
  const { data, isLoading, isError } = fetcher(`api/popular`);
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return (
    <section className="container mx-auto md:px-20 py-16">
      <div className="grid lg:grid-cols-2">
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Business</h1>
          <div className="flex flex-col gap-6">
            {/* posts */}
            {data[1] ? <Post data={data[1]} /> : <></>}
            {data[3] ? <Post data={data[3]} /> : <></>}
            {data[2] ? <Post data={data[2]} /> : <></>}
          </div>
        </div>
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Travel</h1>
          <div className="flex flex-col gap-6">
            {data[4] ? <Post data={data[4]} /> : <></>}
            {data[5] ? <Post data={data[5]} /> : <></>}
            {data[2] ? <Post data={data[2]} /> : <></>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Post({ data }) {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={`/posts/${data.id}`}>
          <a>
            <Image
              src={data.img || ""}
              className="rounded"
              width={300}
              height={250}
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href={`/posts/${data.id}`}>
            <a className="text-orange-600 hover:text-orange-800">
              {data.category || "No Category"}
            </a>
          </Link>
          <Link href={`/posts/${data.id}`}>
            <a className="text-gray-800 hover:text-gray-600">
              - {data.published || ""}
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/posts/${data.id}`}>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {data.title || "No Title"}
            </a>
          </Link>
        </div>
        {data.author ? <Author /> : <></>}
      </div>
    </div>
  );
}
