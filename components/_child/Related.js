import Link from "next/link";
import Image from "next/image";
import Author from "./Author";
import fetcher from "../../library/fetcher";
import Spinner from "./Spinner";
import Error from "./Error";

export default function Related() {
  const { data, isLoading, isError } = fetcher(`api/popular`);
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return (
    <section className="pt-20">
      <h1 className="font-bold text-3xl py-10">Related</h1>

      <div className="flex flex-col gap-10">
        {data?.map((item) => (
          <Post data={item} key={item.id}></Post>
        ))}
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
              src={data.img}
              className="rounded"
              width={300}
              height={200}
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href={`/posts/${data.id}`}>
            <a className="text-orange-600 hover:text-orange-800">
              {data.category}
            </a>
          </Link>
          <Link href={`/posts/${data.id}`}>
            <a className="text-gray-800 hover:text-gray-600">
              - {data.published}
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/posts/${data.id}`}>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {data.title}
            </a>
          </Link>
        </div>
        {data.author ? <Author /> : <></>}
      </div>
    </div>
  );
}
