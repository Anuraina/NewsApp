import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from 'react-infinite-scroll-component';

const Newscomp = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitaliseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=57f4b85f85a843ca93e9c1e20e7cb9e0 &page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(70)
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    console.log(parsedData);

    props.setProgress(100) // Progress goes from 0-100 given in documentation
  }

  useEffect(() => {
  document.title = `${capitaliseFirstLetter(props.category)} -NewsApp`;
    updateNews();

     // eslint-disable-next-line 
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=57f4b85f85a843ca93e9c1e20e7cb9e0 &page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    console.log(parsedData);

  }

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px',marginTop:'90px' }}>News component - Top Headlines from {capitaliseFirstLetter(props.category)} </h1>
      {loading && <Spinner />}
      {/* if loading is true then show spinner */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}>

        <div className='container'>
          <div className="row">
            {articles.map((element) => { // when u use .map then have to give a unique key to all elements
              return <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>

    </>

  )
}


Newscomp.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

// see proptypes casing
Newscomp.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default Newscomp;
