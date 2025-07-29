import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/analytics/stats").then(r => setStats(r.data));
  }, []);

  const barData = [
    { label: "Users", value: stats?.totalUsers || 0 },
    { label: "Rides", value: stats?.totalRides || 0 },
    { label: "Bookings", value: stats?.totalBookings || 0 },
  ];
  const pieData = [
    { id: "Completed", value: stats?.completedTrips || 0 },
    { id: "Other", value: (stats?.totalRides || 0) - (stats?.completedTrips || 0) },
  ];

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white rounded p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">Totals</h2>
          <div style={{ height: 300 }}>
            <ResponsiveBar
              data={barData}
              keys={["value"]}
              indexBy="label"
              margin={{ top: 20, right: 30, bottom: 50, left: 50 }}
              padding={0.4}
              colors={["#003366"]}
              axisBottom={{ tickRotation: -30 }}
              labelSkipWidth={12}
              labelSkipHeight={12}
            />
          </div>
        </div>
        <div className="bg-white rounded p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">Trip Completion Ratio</h2>
          <div style={{ height: 300 }}>
            <ResponsivePie
              data={pieData}
              margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
              innerRadius={0.4}
              padAngle={1.5}
              colors={["#FFD700", "#003366"]}
              enableRadialLabels={false}
              enableSlicesLabels={true}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  symbolSize: 18,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}