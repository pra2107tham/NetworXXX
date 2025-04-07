"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

import { Card } from "@/components/ui/card"

// Sample data
const impressionsData = [
  { name: "Jan 1", value: 400 },
  { name: "Jan 2", value: 300 },
  { name: "Jan 3", value: 500 },
  { name: "Jan 4", value: 280 },
  { name: "Jan 5", value: 590 },
  { name: "Jan 6", value: 320 },
  { name: "Jan 7", value: 600 },
  { name: "Jan 8", value: 700 },
  { name: "Jan 9", value: 500 },
  { name: "Jan 10", value: 750 },
  { name: "Jan 11", value: 800 },
  { name: "Jan 12", value: 700 },
  { name: "Jan 13", value: 900 },
  { name: "Jan 14", value: 800 },
]

const engagementData = [
  { name: "Jan 1", value: 5 },
  { name: "Jan 2", value: 8 },
  { name: "Jan 3", value: 12 },
  { name: "Jan 4", value: 7 },
  { name: "Jan 5", value: 15 },
  { name: "Jan 6", value: 10 },
  { name: "Jan 7", value: 18 },
  { name: "Jan 8", value: 20 },
  { name: "Jan 9", value: 15 },
  { name: "Jan 10", value: 22 },
  { name: "Jan 11", value: 25 },
  { name: "Jan 12", value: 20 },
  { name: "Jan 13", value: 28 },
  { name: "Jan 14", value: 25 },
]

const followersData = [
  { name: "Jan 1", value: 1200 },
  { name: "Jan 2", value: 1250 },
  { name: "Jan 3", value: 1280 },
  { name: "Jan 4", value: 1300 },
  { name: "Jan 5", value: 1350 },
  { name: "Jan 6", value: 1380 },
  { name: "Jan 7", value: 1420 },
  { name: "Jan 8", value: 1450 },
  { name: "Jan 9", value: 1480 },
  { name: "Jan 10", value: 1520 },
  { name: "Jan 11", value: 1550 },
  { name: "Jan 12", value: 1580 },
  { name: "Jan 13", value: 1620 },
  { name: "Jan 14", value: 1650 },
]

interface DashboardChartProps {
  type?: "impressions" | "engagement" | "followers"
}

export function DashboardChart({ type = "impressions" }: DashboardChartProps) {
  const data = type === "impressions" ? impressionsData : type === "engagement" ? engagementData : followersData

  const chartColor = "#E0FF4F"

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#003A40" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#003A40" }}
            tick={{ fill: "#9CA3AF" }}
          />
          <YAxis
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#003A40" }}
            tick={{ fill: "#9CA3AF" }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="border-[#E0FF4F]/20 bg-[#001A1D]/95 backdrop-blur-sm p-2 shadow-md">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-400">{payload[0].payload.name}</span>
                        <span className="text-sm font-bold text-[#E0FF4F]">{payload[0].value}</span>
                      </div>
                    </div>
                  </Card>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={chartColor}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
            dot={{ r: 4, fill: "#001A1D", strokeWidth: 2, stroke: chartColor }}
            activeDot={{ r: 6, fill: chartColor, stroke: "#001A1D", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

