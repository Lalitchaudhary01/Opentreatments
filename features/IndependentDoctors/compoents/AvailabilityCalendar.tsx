import React from "react";
import { AvailabilitySlot } from "../types/IndependentDoctor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertCircle } from "lucide-react";

interface AvailabilityCalendarProps {
  availability: AvailabilitySlot[];
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  availability,
}) => {
  if (!availability || availability.length === 0) {
    return (
      <Card className="border-dashed border-2 border-gray-200 bg-gray-50/30">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-gray-500 text-center">
            No availability information provided
          </p>
          <p className="text-sm text-gray-400 text-center mt-1">
            Please contact the doctor directly for scheduling
          </p>
        </CardContent>
      </Card>
    );
  }

  const getDayColor = (day: string) => {
    const colors = {
      monday: "bg-blue-100 text-blue-700 border-blue-200",
      tuesday: "bg-green-100 text-green-700 border-green-200",
      wednesday: "bg-purple-100 text-purple-700 border-purple-200",
      thursday: "bg-yellow-100 text-yellow-700 border-yellow-200",
      friday: "bg-pink-100 text-pink-700 border-pink-200",
      saturday: "bg-indigo-100 text-indigo-700 border-indigo-200",
      sunday: "bg-red-100 text-red-700 border-red-200",
    };
    return (
      colors[day.toLowerCase() as keyof typeof colors] ||
      "bg-gray-100 text-gray-700 border-gray-200"
    );
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white pb-4">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Available Schedule
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-3">
          {availability.map((slot, index) => (
            <div
              key={index}
              className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white to-gray-50/30"
            >
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={`px-3 py-1 font-semibold capitalize min-w-[90px] justify-center ${getDayColor(
                    slot.day
                  )}`}
                >
                  {slot.day}
                </Badge>

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">Available</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded-md border border-green-200">
                      {slot.startTime}
                    </span>
                    <span className="text-gray-400">—</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-200">
                      {slot.endTime}
                    </span>
                  </div>
                </div>

                <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-125 transition-transform"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 text-blue-700 text-sm">
            <Clock className="w-4 h-4" />
            <span className="font-medium">
              All times are in local timezone. Please confirm availability
              before booking.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;
