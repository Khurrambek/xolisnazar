import React, { useEffect, useState } from "react";
import "./dashboard.css";
import DashboardCard from "./DashboardCard/DashboardCard";
import LineChart from "../../components/LineChart/LineChart";
import TodoList from "../../components/TodoList/TodoList";
import LatestNews from "./LatestNews/LatestNews";
import FooterDashboard from "./FooterDashboard/FooterDashboard";
import indexConfig from "../../../config/indexConfig";

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [newspaper, setNewspaper] = useState([]);
  useEffect(() => {
    getLastNews();
    getSubscription();
    getNewspapers();
  }, []);

  //Get => get lastnews
  const getLastNews = async () => {
    await indexConfig.get("/getLastNews").then((res) => {
      setNews(res.data.lastNews);
    });
  };

  const totalViews = news.reduce((total, data) => {
    return (total += data.views);
  }, 0);

  //Get => get subscription
  const getSubscription = async () => {
    await indexConfig
      .get("/getAllSubscriptionBills")
      .then((res) => setSubscribers(res.data.bills));
  };
  const totalAmount = subscribers.reduce((total, data) => {
    if (data.paid) {
      return (total += data.amount);
    }
    return total;
  }, 0);

  //Get => get newspapers
  const getNewspapers = async () => {
    await indexConfig
      .get("/getAllNewspaperBills")
      .then((res) => setNewspaper(res.data.bills));
  };

  const totalAmountTwo = newspaper.reduce((total, data) => {
    if (data.paid) {
      return (total += data.paymentAmount);
    }
    return total;
  }, 0);

  return (
    <div className="page-container">
      <section className="dashboard-content">
        <div className="dashboard-card-section row ">
          <DashboardCard
            indicatorIcon="assets/dashboard/people.png"
            statNumbers={totalViews}
            statSection="Ko'rilganlar Soni"
            chartIcon="assets/dashboard/viewsRate.png"
          />
          <DashboardCard
            indicatorIcon="assets/dashboard/bag.png"
            statNumbers={news.length}
            statSection="Yangiliklar Soni"
            chartIcon="assets/dashboard/newsRate.png"
          />
          <DashboardCard
            indicatorIcon="assets/dashboard/cart.png"
            statNumbers={subscribers.length}
            statSection="Obunachilar Soni"
            chartIcon="assets/dashboard/subscribeRate.png"
          />
          <DashboardCard
            indicatorIcon="assets/dashboard/dollar.png"
            statNumbers={totalAmount + totalAmountTwo}
            statSection="Daromad Miqdori"
            chartIcon="assets/dashboard/revenueRate.png"
          />
        </div>
      </section>
      <section className="row statistics-section">
        <div className="col-md-7 chart-wrapper">
          <LineChart />
        </div>
        <div className="col-md-5 todo-wrapper">
          <TodoList />
        </div>
      </section>
      <section className="row latest-news-section">
        <LatestNews />
      </section>
      <footer className="dashboard-footer">
        <FooterDashboard />
      </footer>
    </div>
  );
};

export default Dashboard;
