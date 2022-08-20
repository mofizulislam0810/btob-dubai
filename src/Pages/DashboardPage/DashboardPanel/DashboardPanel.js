import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import { environment } from "../../SharePages/Utility/environment";
import currentYear from "../../SharePages/Utility/currentYear";
import Chart from "../Chart";
import Footer from "../../SharePages/Footer/Footer";
import { Box, Text } from "@chakra-ui/react";

import calanderOneMonthRes from "../../../JSON/calanderOneMonthRes";
import RevoCalendar from "revo-calendar";

const DashboardPanel = () => {
 const [eventList,setEventList] = useState([]);
  const getEventBooking = async() => {
    const response = await axios.get(environment.getCalendarEventBooking+`/2022/7`,environment.headerToken);
    console.log(response);
    setEventList(await response.data.map((obj) => {
      var date = new Date(obj.date);
      var timestamp = +date;
      return {
        name: obj.id,
        date: timestamp,
      };
    }))
  }

  const handleViewTicket = (index) => {
    let obj = [];
    obj = eventList.filter((item,idx)=>{
      if(idx===index){
        return item;
      }
    })
    // console.log(obj[0].name);
    window.open("/ticket?utid=" + obj[0].name, "_blank");
    //navigate("/ticket?utid="+utid,'_blank');
  };


  console.log(eventList);

  const [highestTicktedAirlines, setHighestTicktedAirlines] = useState([]);
  const [labelList, setLabelList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    const fetchPrices = async () => {
      console.log(highestTicktedAirlines);
      setChartData({
        labels: highestTicktedAirlines.map((crypto) => crypto.airLineCode),
        datasets: [
          {
            label: "",
            data: highestTicktedAirlines.map((crypto) => crypto.ticketCount),
            backgroundColor: [
              "#ffbb11",
              "#C0C0C0",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
          },
        ],
      });
    };
    fetchPrices();
  }, [highestTicktedAirlines]);

  // useEffect(() => {
  //   $(document).ready(function () {
  //     Chart.register(...registerables);

  //     // var areaChartData = {
  //     //       labels  : labelList,
  //     //       datasets: [
  //     //         {
  //     //           label               : 'Highest Tickted Airlines',
  //     //           backgroundColor     : 'rgba(60,141,188,0.9)',
  //     //           borderColor         : 'rgba(60,141,188,0.8)',
  //     //           pointRadius          : false,
  //     //           pointColor          : '#3b8bba',
  //     //           pointStrokeColor    : 'rgba(60,141,188,1)',
  //     //           pointHighlightFill  : '#fff',
  //     //           pointHighlightStroke: 'rgba(60,141,188,1)',
  //     //           data                : dataList
  //     //         }
  //     //       ]
  //     //     }

  //     //   var barChartCanvas = $("#barChart").get(0).getContext("2d");

  //     //         var barChartData = $.extend(true, {}, areaChartData)
  //     //       var temp0 = areaChartData.datasets[0]
  //     //       barChartData.datasets[0] = temp0;
  //     //         var barChartOptions = {
  //     //       responsive              : true,
  //     //       maintainAspectRatio     : false,
  //     //       datasetFill             : false
  //     //     }
  //     // console.log(barChartData)
  //     //     new Chart(barChartCanvas, {
  //     //       type: 'bar',
  //     //       data: barChartData,
  //     //       options: barChartOptions
  //     //     })
  //     console.log(labelList)
  //     console.log(dataList)
  //     var areaChartData = {
  //       labels: [""],
  //       datasets: [
  //         {
  //           label: 'Highest Tickted Airlines',
  //           backgroundColor: 'rgba(60,141,188,0.9)',
  //           borderColor: 'rgba(60,141,188,0.8)',
  //           pointRadius: false,
  //           pointColor: '#3b8bba',
  //           pointStrokeColor: 'rgba(60,141,188,1)',
  //           pointHighlightFill: '#fff',
  //           pointHighlightStroke: 'rgba(60,141,188,1)',
  //           data: [0]
  //         }
  //       ]
  //     }
  //     console.log(areaChartData)
  //     var barChartCanvas = $('#barChart').get(0).getContext('2d')
  //     var barChartData = $.extend(true, {}, areaChartData)
  //     var temp0 = areaChartData.datasets[0]
  //     barChartData.datasets[0] = temp0

  //     var barChartOptions = {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       datasetFill: false
  //     }

  //     var chart = new Chart(barChartCanvas, {
  //       type: 'bar',
  //       data: barChartData,
  //       options: barChartOptions
  //     })

  //   })
  //   $(document).ready(function () {

  //   })

  // }, [labelList, dataList]);
  const [totalBooking, setTotalBokking] = useState(0);
  const [totalTicket, setTotalTicket] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  const handleCount = () => {
    const current = new Date();
    const currentDate = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`;
    let obj = {
      agentId: sessionStorage.getItem("agentId"),
      fromDate: currentDate,
      toDate: currentDate,
    };

    const getTotalBooking = async () => {
      const response = await axios.post(
        environment.totalBooking,
        obj,
        environment.headerToken
      );
      setTotalBokking(response.data);
    };
    getTotalBooking();

    const getTotalTicket = async () => {
      const response = await axios.post(
        environment.totalTicket,
        obj,
        environment.headerToken
      );
      setTotalTicket(response.data);
    };
    getTotalTicket();

    const getTotalSales = async () => {
      const response = await axios.post(
        environment.totalSales,
        obj,
        environment.headerToken
      );
      setTotalSales(response.data);
    };
    getTotalSales();

    const getHighestTicktedAirlines = async () => {
      const response = await axios.post(
        environment.highestTicktedAirlines,
        obj,
        environment.headerToken
      );
      let labelList = [];
      let dataList = [];
      setHighestTicktedAirlines(response.data);
      response.data.map((item) => {
        labelList.push(item.airLineCode);
        dataList.push(item.ticketCount);
      });
      setLabelList(labelList);
      setDataList(dataList);
    };
    getHighestTicktedAirlines();
  };

  useEffect(() => {
    handleCount();
    getEventBooking();
  }, []);

  return (
    <>
      <div
        className="content-wrapper search-panel-bg"
        style={{ height: "800px" }}
      >
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 fw-bold">Dashboard</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{totalBooking}</h3>
                    <p>Total Booking</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag"></i>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{totalTicket}</h3>

                    <p>Total Ticket</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars"></i>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>AED {totalSales}</h3>
                    <p>Total Sales</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add"></i>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>
                      {highestTicktedAirlines[0]?.ticketCount}{" "}
                      <span style={{ fontSize: "15px" }}>
                        ({highestTicktedAirlines[0]?.airLineName})
                      </span>
                    </h3>
                    <p>Highest Tickted Airline</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-fluid">
          <div className="row hero">
            <div className="col-md-6">
              {/* <div id="calendar2"></div> */}

              <Box
                mx="10px"
                borderRadius="4px"
                boxShadow="md"
                overflow="hidden"
              >
                <Box w="100%" bg="#1e88e5">
                  <Text
                    fontSize="lg"
                    color="white"
                    fontWeight={400}
                    py="12px"
                    px="20px"
                  >
                    Event Calender
                  </Text>
                </Box>
                <RevoCalendar
                  events={eventList}
                  highlightToday={true}
                  lang="en"
                  primaryColor="#4F6995"
                  secondaryColor="#fff"
                  todayColor="#0083fc"
                  textColor="#1e1e1e"
                  indicatorColor="#ff0000"
                  animationSpeed={300}
                  sidebarWidth={180}
                  detailWidth={280}
                  showDetailToggler={true}
                  showSidebarToggler={true}
                  onePanelAtATime={true}
                  allowDeleteEvent={false}
                  allowAddEvent={false}
                  openDetailsOnDateSelection={true}
                  timeFormat24={true}
                  showAllDayLabel={true}
                  detailDateFormat="DD/MM/YYYY"
                  eventSelected={(index) =>{
                    handleViewTicket(index);
                    console.log("index of response json : " + index)
                  }
                  }
                />
              </Box>
            </div>

            <div className="col-md-6">
              {/* <div id="calendar1"></div>   */}
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">Highest Ticketed Airlines</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  {/* <div className="chart"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                    <canvas id="barChart" style={{ minHeight: '250px', height: '250px', maxHeight: '250px', maxWidth: '100%', display: 'block', width: '572px' }} width="715" height="312" className="chartjs-render-monitor"></canvas>
                  </div> */}
                  <Chart chartData={chartData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPanel;
