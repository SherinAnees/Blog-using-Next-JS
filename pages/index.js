import Category from "../components/Category";

import LatestPost from "../components/LatestPost";
import Layout from "../components/Layout";
import MostPopular from "../components/MostPopular";
import Section from "../components/Section";

export default function Home() {
  return (
    <Layout>
      <Section />
      <LatestPost />
      <MostPopular />
      <Category />
    </Layout>
  );
}
