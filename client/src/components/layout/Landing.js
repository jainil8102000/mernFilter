import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
function Landing() {
  const [news, setNews] = useState([]);
  const [newsDropdown, setNewsDropdown] = useState([]);
  const [uniqueYears, setUniqueyears] = useState([]);
  const [pageCount, setPagecount] = useState(1);
  const [yearFilterValue, setYearFilterValue] = useState("");

  // for get year
  async function getYear(e) {
    const headers = {
      "Content-Type": "application/json",
    };
    const url =
      "https://www.ihgplc.com/api/News/APIGetLatestNewsByRegion?year=recent&topic=&brand=&region=&type=&showcount=1000&page=1";
    const res = await axios.get(url, { headers });

    const result = JSON.parse(res.data);
    let a = [];
    a.push(result);

    let newsItems = a[0].List;

    
    const data = newsItems.map((item) => {
      return {
        date: new Date(item.Date),
      };
    });
    const years = data.map((item) => item.date.getFullYear());
    const uniqueYears = [...new Set(years)];
    setUniqueyears(uniqueYears);
  }


  useEffect(()=>{
      getYear();
      console.log("useEffect" ,news);
  },[news]);

  useEffect(() => {
    // get data from API
    async function getNewsData() {
      const headers = {
        "Content-Type": "application/json",
      };
      const url =
        "https://www.ihgplc.com/api/News/APIGetLatestNewsByRegion?year=recent&topic=&brand=&region=&type=&showcount=3&page=1";
      const res = await axios.get(url, { headers });

      const result = JSON.parse(res.data);
      let a = [];
      a.push(result);

      let newsItems = a[0].List;

      setNews(newsItems);
      setNewsDropdown(res.data);
    }
    getNewsData();
    getYear();

  }, []);


  // for subject filter
  async function subjectFilter(e) {

    let selectedValue = e.target.value;
    const headers = {
      "Content-Type": "application/json",
    };
    const url = `https://www.ihgplc.com/api/News/APIGetLatestNewsByRegion?year=recent&${selectedValue}=&brand=&region=&type=&showcount&page=1`;
    const res = await axios.get(url, { headers });

    const result = JSON.parse(res.data);
    let a = [];
    a.push(result);
    let newsItems = a[0].List;

    setNews(newsItems);
  }

  // for loadmore 
  async function loadMore(e) {
    let currentPage = pageCount + 1;
    setPagecount(currentPage);
    const headers = {
      "Content-Type": "application/json",
    };
    if(yearFilterValue == "Select Year"){
      yearFilterValue = "recent";
    }

    let url = `https://www.ihgplc.com/api/News/APIGetLatestNewsByRegion?year=${yearFilterValue}&topic=&brand=&region=&type=&showcount=${currentPage * 3}&page=1`;

    const res = await axios.get(url, { headers });
    const result = JSON.parse(res.data);

    let a = [];
    a.push(result);
    let newsItems = a[0].List;

    setNews(newsItems);
    getYear();
  }

// for year filter
async function yearFilter(e) {
  let selectedValue = e.target.value;
  setYearFilterValue(selectedValue);
  const headers = {
    "Content-Type": "application/json",
  };
  let url;
  console.log("page", pageCount)
  if (selectedValue == "Select Year") {
    url = `https://www.ihgplc.com/api/News/APIGetLatestNewsByRegion?year=&topic=&brand=&region=&type=&showcount=3&page=1`;
  } else {
    console.log("page", pageCount)
    url = `https://www.ihgplc.com/api/News/APIGetLatestNewsByRegion?year=${selectedValue}&topic=&brand=&region=&type=&showcount=${pageCount * 3}&page=1`;
    console.log(url);
  }

  const res = await axios.get(url, { headers });
  const result = JSON.parse(res.data);
  let a = [];
  a.push(result);
  let newsItems = a[0].List;

  setNews(newsItems);
}



  // for type filter
  async function typeFilter(e) {
    let selectedValue = e.target.value;
    const headers = {
      "Content-Type": "application/json",
    };
    let url;
    
    if (selectedValue == "Select Year") {
      url = `https://www.ihgplc.com/api/News/APIGetLatestNewsByRegion?year=&topic=&brand=&region=&type=&showcount=200&page=1`;
    } else {
      url = `https://www.ihgplc.com/api/News/APIGetLatestNewsByRegion?year=${selectedValue}&topic=&brand=&region=&type=&showcount=${pageCount * 3}&page=1`;
    }

    const res = await axios.get(url, { headers });
    const result = JSON.parse(res.data);
    let a = [];
    a.push(result);
    let newsItems = a[0].List;

    setNews(newsItems);
  }

  return (
    <Fragment>
      <section
        className="news-filter-area module-wrapper pb-0"
        id="newsFilterArea"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="filter-dropdown  filter__year">
                <select
                  defaultValue={`e21`}
                  onChange={yearFilter}
                  className="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option defaultValue="23" >
                    Select Year
                  </option>
                  {uniqueYears.map((year, index) => {
                    return (
                      <option key={index} defaultValue={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="filter-dropdown  filter__subject">
                <select
                  defaultValue={`41`}
                  onChange={subjectFilter}
                  className="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option >Select Subject</option>
                  {Array.from(new Set(news.map((obj) => obj.Topic))).map(
                    (topic, i) => {
                      return (
                        <option key={i} defaultValue={topic}>
                          {topic}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="filter-dropdown  filter__subject">
                <select
                  defaultValue={`sd`}
                  onChange={typeFilter}
                  className="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option>Select Type</option>
                  {Array.from(new Set(news.map((obj) => obj.Type))).map(
                    (type, i) => {
                      return (
                        <option key={i} defaultValue={type}>
                          {type}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="module-news module-wrapper" id="moduleNews">
        <div className="container">
          <div className="row">
            {news.map((newsData, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-4 col-md-6"
                  data-url={newsData.Link}
                >
                  <Link
                    className="text-decoration-none"
                    to={`https://www.ihgplc.com/${newsData.Link}`}
                    target="_blank"
                  >
                    <div className="module-news__image">
                      <img
                        className="img-fluid"
                        src={`https://www.ihgplc.com/en${newsData.ThumbnailImageUrl}`}
                        alt={newsData.image}
                      />
                    </div>

                    <div className="module-news__inner-wrapper mb-5">

                      <div className="module-news__title">
                        <h4>{newsData.Title} </h4>
                      </div>
                      <div className="module-news__date">
                        <span>{newsData.Date} </span>
                      </div>
                      <div className="module-news__topic">
                        <span>{newsData.Topic} </span>
                      </div>
                      <div className="module-news__type">
                        <span>{newsData.Type} </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
            <div className="load-more d-flex justify-content-center align-items-center">
              <button onClick={loadMore} className="btn btn-primary">
                Load More
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
export default Landing;
