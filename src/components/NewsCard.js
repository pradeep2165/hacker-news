import React, { useEffect, useState } from "react";

const NewsCard = ({ newsId }) => {
  const [data, setData] = useState([]);
  const getDetails = async () => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`);
    setData(await response.json());
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="col-sm-3 m-1">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title bg-info text-end">{data.by}</h5>
          <p className="card-text" style={{height:"70px"}}>{data.title}</p>
          <p>{data.time && new Date(data.time*1000).toDateString()}</p>
          <a href={data.url} className="btn btn-primary">
            News Details..
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
