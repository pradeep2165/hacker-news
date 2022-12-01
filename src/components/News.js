import React, { useEffect, useState, lazy, Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import NewsCard from "./NewsCard";
// import { data } from "../rowData";
const NewsCard = lazy(()=>import('./NewsCard'));

const News = () => {
  const [data, setData] = useState([]);
  const [lim, setLim] = useState(10);
  const [newsData, setNewsData] = useState([]);

  const fetchMoreData = () => {
    setTimeout(()=>{
      let newLimit = lim + 3;
    setNewsData(newsData.concat(data.slice(newsData.length, newLimit)));
    setLim(newLimit);
    }, 1000)
  };
  const getNew = async () => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`);
    const parseData = await response.json();
    setData(parseData);
    setNewsData(newsData.concat(data.slice(newsData.length, lim)));
  };
  useEffect(() => {
    getNew();
  }, [data]);

  return (
    <>
    <h1>Hacker News</h1>
      <InfiniteScroll
        dataLength={newsData.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={data.length !== newsData.length}
        loader={<h4>Loading...</h4>}
      >
        <div className="container mt-2">
          
            <div className="d-flex justify-content-start flex-wrap">{newsData && newsData.map((x, i) => <Suspense ><NewsCard newsId={x} key={i} /></Suspense>)}</div>
          
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
