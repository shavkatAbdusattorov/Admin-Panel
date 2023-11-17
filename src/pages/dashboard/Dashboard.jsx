import React, { useEffect, useState } from "react";
import { Paper, Typography, Box } from "@mui/material";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import axios from "axios";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const { Countdown } = Statistic;
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

const onFinish = () => {
  console.log("finished!");
};
const onChange = (val) => {
  if (typeof val === "number" && 4.95 * 1000 < val && val < 5 * 1000) {
    console.log("changed!");
  }
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  const [showProducts, setShowProducts] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const toggleProducts = () => {
    setShowProducts(!showProducts);
  };

  const toggleBrands = () => {
    setShowBrands(!showBrands);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const categories = "http://localhost:3000/api/categories";
  function getToken() {
    return localStorage.getItem("access_token");
  }
  const token = getToken();
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.log(
        "There was a problem with the axios operation: " + error.message
      );
    }
  };

  const getBrands = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/brands");
      setBrands(response.data);
    } catch (error) {
      console.log(
        "There was a problem with the axios operation: " + error.message
      );
    }
  };
  const [orders, setOrders] = useState([]);
  let token2 = localStorage.getItem("access_token");
  console.log(token2);
  const getorders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/orders", {
        headers: {
          Authorization: `Bearer ${token2}`,
        },
      });
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(
        "There was a problem with the axios operation: " + error.message
      );
    }
  };

  useEffect(() => {
    getProducts();
    getBrands();
    getorders();
  }, []);

  const handleChange = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, complete: !order.complete } : order
      )
    );
  };
  const [currentTime, setCurrentTime] = useState(new Date());
  const [chartType, setChartType] = useState("Bar");
  const chartData = [
    { name: "Brands", uv: 4000, pv: 2400 },
    { name: "Blue", uv: 3000, pv: 1398 },
    { name: "Yellow", uv: 2000, pv: 9800 },
    { name: "Green", uv: 2780, pv: 3908 },
    { name: "Purple", uv: 1890, pv: 4800 },
    { name: "Orange", uv: 2390, pv: 3800 },
  ];
  const [Categories, setcategories] = useState([]);

  async function getcategories() {
    try {
      const { data } = await axios.get(categories, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setcategories(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getcategories();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const [secondChartType, setSecondChartType] = useState("Pie");
  const [quote, setQuote] = useState("");
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get("https://type.fit/api/quotes");
        const quotes = response.data;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote.text);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuote();
  }, []);

  const renderChart = (chartType) => {
    if (chartType === "Bar") {
      return (
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      );
    } else if (chartType === "Line") {
      return (
        <LineChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      );
    } else if (chartType === "Pie") {
      return (
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="uv"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      );
    }
  };

  return (
    <>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "15px",
        }}
      >
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Countdown
                title="Countdown"
                value={deadline}
                onFinish={onFinish}
              />
            </Col>
            <Col span={12}>
              <Countdown
                title="Million Seconds"
                value={deadline}
                format="HH:mm:ss:SSS"
              />
            </Col>
            <Col
              span={24}
              style={{
                marginTop: 32,
              }}
            >
              <Countdown
                title="Day Level"
                value={deadline}
                format="D 天 H 时 m 分 s 秒"
              />
            </Col>
            <Col span={12}>
              <Countdown
                title="Countdown"
                value={Date.now() + 10 * 1000}
                onChange={onChange}
              />
            </Col>
          </Row>{" "}
          <Row gutter={16}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{
                    color: "#3f8600",
                  }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Idle"
                  value={9.3}
                  precision={2}
                  valueStyle={{
                    color: "#cf1322",
                  }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className="w-[100%]">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h3>Inspirational Quote of the Day</h3>
          <h3>Current Time: {currentTime.toLocaleTimeString()}</h3>
        </div>
        <p
          className=" font-bold "
          style={{ textAlign: "center", fontStyle: "italic" }}
        >
          {quote}
        </p>
        <details open>
          <summary style={{ marginBottom: "15px", fontSize: "20px" }}>
            Metrics
          </summary>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                padding: "20px",
                flexGrow: 1,
                marginRight: "10px",
                backgroundColor: "#e0e0e0",
                borderRadius: "15px",
              }}
            >
              <h5>Number of products: {products.length}</h5>
              {showProducts &&
                products.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      margin: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      backgroundColor: "#e0e0e0",
                    }}
                  >
                    <h2>{product.name}</h2>
                    <p></p>
                  </div>
                ))}
              <button
                onClick={toggleProducts}
                style={{
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                }}
              >
                Toggle Products
              </button>
            </div>
            <div
              style={{
                padding: "20px",
                flexGrow: 1,
                marginLeft: "10px",
                backgroundColor: "#e0e0e0",
                borderRadius: "15px",
              }}
            >
              <h5>Number of brands: {brands.length}</h5>
              {showBrands &&
                brands.map((brand) => (
                  <div
                    key={brand.id}
                    style={{
                      margin: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      backgroundColor: "#e0e0e0",
                    }}
                  >
                    <h2>{brand.name}</h2>
                  </div>
                ))}
              <button
                onClick={toggleBrands}
                style={{
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#2196F3",
                  color: "white",
                }}
              >
                Toggle Brands
              </button>
            </div>
            <div
              style={{
                padding: "20px",
                flexGrow: 1,
                marginLeft: "10px",
                backgroundColor: "#e0e0e0",
                borderRadius: "15px",
              }}
            >
              <h5>Number of categories: {Categories.length}</h5>
              {showCategories &&
                Categories.map((category) => (
                  <div
                    key={category.id}
                    style={{
                      margin: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      backgroundColor: "#e0e0e0",
                    }}
                  >
                    <h2>{category.name}</h2>
                  </div>
                ))}
              <button
                onClick={toggleCategories}
                style={{
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#f44336",
                  color: "white",
                }}
              >
                Toggle Categories
              </button>
            </div>
          </div>
        </details>
        <details open>
          <summary style={{ marginBottom: "15px", fontSize: "20px" }}>
            Charts
          </summary>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                padding: "20px",
                flexGrow: 1,
                marginRight: "10px",
                backgroundColor: "#e0e0e0",
                borderRadius: "15px",
              }}
            >
              <h5>Sample Chart 1</h5>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                style={{
                  width: "200px",
                  height: "35px",
                  background: "white",
                  color: "gray",
                  paddingLeft: "5px",
                  fontSize: "14px",
                  border: "none",
                  marginLeft: "10px",
                }}
              >
                <option value="Bar">Bar Chart</option>
                <option value="Line">Line Chart</option>
              </select>
              {renderChart(chartType)}
            </div>
            <div
              style={{
                padding: "20px",
                flexGrow: 1,
                marginLeft: "10px",
                backgroundColor: "#e0e0e0",
                borderRadius: "15px",
              }}
            >
              <h5>Sample Chart 2</h5>
              <select
                value={secondChartType}
                onChange={(e) => setSecondChartType(e.target.value)}
                style={{
                  width: "200px",
                  height: "35px",
                  background: "white",
                  color: "gray",
                  paddingLeft: "5px",
                  fontSize: "14px",
                  border: "none",
                  marginLeft: "10px",
                }}
              >
                <option value="Bar">Bar Chart</option>
                <option value="Pie">Pie Chart</option>
              </select>
              {renderChart(secondChartType)}
            </div>
          </div>
        </details>
        <details open>
          <summary className="mb-4 text-lg text-blue-500">Orders</summary>
          <div className="flex justify-between mb-8">
            <div className="p-6 flex-grow mr-4 bg-gray-300 rounded-xl">
              <h5 className="text-lg mb-4">
                Number of orders: {orders.length}
              </h5>

              {orders.every((order) => order.complete) && (
                <h5 className="text-lg mb-4 text-green-500">
                  Congratulations! All orders are completed! 🎉
                </h5>
              )}
              <table className="table-auto w-full rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Complete</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={
                        index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"
                      }
                    >
                      <td className="border px-4 py-2">
                        <img
                          src={`http://localhost:3000/${order.img}`}
                          alt={order.name}
                          className="w-12 h-12"
                        />
                      </td>
                      <td
                        className={`border px-4 py-2 text-black ${
                          order.complete ? "line-through" : ""
                        }`}
                      >
                        {order.name}
                      </td>
                      <td
                        className={`border px-4 py-2 ${
                          order.complete ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {order.price}
                      </td>

                      <td className="border px-4 py-2">
                        <input
                          type="checkbox"
                          className="w-6 h-6 checked:bg-blue-500 checked:border-transparent"
                          checked={order.complete}
                          onChange={() => handleChange(order.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* ... other components */}
          </div>
        </details>
      </div>
    </>
  );
};

export default Dashboard;
