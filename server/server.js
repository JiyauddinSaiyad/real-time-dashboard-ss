const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({
  server,
  verifyClient: () => true,
});

const generateMetrics = () => {
  const metrics = [
    { id: "cpu", name: "CPU Usage", unit: "%" },
    { id: "memory", name: "Memory Usage", unit: "MB" },
    { id: "network_in", name: "Network In", unit: "Mbps" },
    { id: "network_out", name: "Network Out", unit: "Mbps" },
    { id: "disk_io", name: "Disk I/O", unit: "MB/s" },
    { id: "response_time", name: "Response Time", unit: "ms" },
    { id: "error_rate", name: "Error Rate", unit: "%" },
    { id: "requests", name: "Requests", unit: "req/s" },
  ];

  return metrics.map((metric) => ({
    ...metric,
    value: Math.floor(
      Math.random() * (metric.name.includes("Usage") ? 100 : 1000)
    ),
    timestamp: Date.now(),
    trend: ["up", "down", "stable"][Math.floor(Math.random() * 3)],
    percentageChange: parseFloat((Math.random() * 10 - 5).toFixed(2)),
  }));
};

const generateHistoricalData = (timeRange) => {
  const now = Date.now();
  const timeRanges = {
    "1h": { span: 60 * 60 * 1000, points: 60 },
    "6h": { span: 6 * 60 * 60 * 1000, points: 72 },
    "24h": { span: 24 * 60 * 60 * 1000, points: 96 },
    "7d": { span: 7 * 24 * 60 * 60 * 1000, points: 56 },
    "30d": { span: 30 * 24 * 60 * 60 * 1000, points: 60 },
  };

  const { span: timeSpanMs, points: pointsCount } =
    timeRanges[timeRange] || timeRanges["1h"];
  const intervalMs = timeSpanMs / pointsCount;

  return generateMetrics().map((metric) => ({
    ...metric,
    data: Array.from({ length: pointsCount }, (_, i) => ({
      timestamp: now - timeSpanMs + i * intervalMs,
      value: Math.round(Math.random() * 100),
    })),
  }));
};

wss.on("connection", (ws) => {
  ws.send(
    JSON.stringify({
      type: "metrics",
      data: generateMetrics(),
      timestamp: Date.now(),
    })
  );

  const intervalId = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "metrics",
          data: generateMetrics(),
          timestamp: Date.now(),
        })
      );
    }
  }, 5000);

  ws.on("close", () => clearInterval(intervalId));
});

app.get("/api/metrics", (req, res) => {
  console.log("REST API request for current metrics");
  res.json(generateMetrics());
});

app.get("/api/historical/:timeRange", (req, res) => {
  const { timeRange } = req.params;
  if (!["1h", "6h", "24h", "7d", "30d"].includes(timeRange)) {
    return res.status(400).json({ error: "Invalid time range" });
  }
  res.json(generateHistoricalData(timeRange));
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
