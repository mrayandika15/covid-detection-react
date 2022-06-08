import Layout from "../layouts";
import { useEffect, useState } from "react";
import axios from "axios";
import { CovidStatistic, TableStatistic } from "../components";

const CovidArea = ({ resource }) => {
  const [resourceData, setResource] = useState(resource);

  // useEffect(() => {
  //   (() => {
  //     axios
  //       .get(baseUrl)
  //       .then((res) => {
  //         setResource(res?.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   })();
  // }, []);

  return (
    <Layout>
      <CovidStatistic resource={resourceData} />
    </Layout>
  );
};

export default CovidArea;

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const baseUrl = "https://coronavirus-19-api.herokuapp.com/countries";

  const responds = await fetch(baseUrl);

  const resource = await responds.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      resource,
    },
  };
}
