import Link from "next/link";
import Image from "next/image";
import Author from "./_child/Author";
import fetcher from "../library/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";
function LatestPost() {
  //fetch data using SWR
  const { data, isLoading, isError } = fetcher(`api/posts`);
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">Latest Posts</h1>

      {/* grid columns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {data?.map((item) => (
          <Post data={item} key={item.id}></Post>
        ))}
      </div>
    </section>
  );
}

export default LatestPost;
//single post component
function Post({ data }) {
  //const { title, published, category, author, img } = data;
  return (
    <div className="item">
      <div className="images">
        <Link href={`/posts/${data.id}`}>
          <a>
            <Image
              src={data.img || "/"}
              className="rounded"
              width={500}
              height={350}
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link href={`/posts/${data.id}`}>
            <a className="text-orange-600 hover:text-orange-800">
              {data.category || "Unknown"}
            </a>
          </Link>
          <Link href={`/posts/${data.id}`}>
            <a className="text-gray-800 hover:text-gray-600">
              -{data.published || "Unknown"}
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/posts/${data.id}`}>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {data.title || "Unknown"}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">
          Even the all-powerful Pointing has no control about the blind texts it
          is an almost unorthographic life One day however a small line of blind
          text by the name of Lorem Ipsum decided to leave for the far World of
          Grammar.
        </p>
        {data.author ? <Author {...data.author} /> : <></>}
      </div>
    </div>
  );
}
