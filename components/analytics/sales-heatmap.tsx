"use client"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hours = Array.from({ length: 24 }, (_, i) => i)

// Mock data for heatmap
const generateHeatmapData = () => {
  return days.flatMap((day) =>
    hours.map((hour) => ({
      day,
      hour,
      value: Math.floor(Math.random() * 100),
    })),
  )
}

const data = generateHeatmapData()

const getIntensity = (value: number) => {
  if (value < 20) return "bg-blue-100"
  if (value < 40) return "bg-blue-200"
  if (value < 60) return "bg-blue-300"
  if (value < 80) return "bg-blue-400"
  return "bg-blue-500"
}

export function SalesHeatmap() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-25 gap-1 text-xs">
        <div></div>
        {hours.map((hour) => (
          <div key={hour} className="text-center text-muted-foreground">
            {hour}
          </div>
        ))}
        {days.map((day) => (
          <div key={day} className="space-y-1">
            <div className="text-muted-foreground font-medium">{day}</div>
            <div className="grid grid-cols-24 gap-1">
              {hours.map((hour) => {
                const cellData = data.find((d) => d.day === day && d.hour === hour)
                return (
                  <div
                    key={`${day}-${hour}`}
                    className={`w-3 h-3 rounded-sm ${getIntensity(cellData?.value || 0)}`}
                    title={`${day} ${hour}:00 - ${cellData?.value || 0} sales`}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-blue-100 rounded-sm"></div>
          <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
          <div className="w-3 h-3 bg-blue-300 rounded-sm"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
