import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import Author from "./_child/Author";
import fetcher from "../library/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";
function MostPopular() {
  //fetch data using SWR
  const { data, isLoading, isError } = fetcher(`api/popular`);
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>

      {/* swiper */}
      <Swiper slidesPerView={2}>
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <Post data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default MostPopular;
function Post({ data }) {
  return (
    <div className="grid">
      <div className="images">
        <Link href={"/"}>
          <a>
            <Image src={data.img || "/"} width={600} height={400} />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link href={"/"}>
            <a className="text-orange-600 hover:text-orange-800">
              {data.category || "Unknown"}
            </a>
          </Link>
          <Link href={"/"}>
            <a className="text-gray-800 hover:text-gray-600">
              - {data.published || "Unknown"}
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={"/"}>
            <a className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">
              {data.title || "Unknown"}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{data.description || "Unknown"}</p>
        {data.author ? <Author /> : <></>}
      </div>
    </div>
  );
}
