"use client";
import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { bookConsultation } from "../actions/bookConsultation";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  FileText,
  CheckCircle,
  Loader2,
  IndianRupee,
  AlertCircle,
  Info,
  Sparkles,
} from "lucide-react";

interface BookConsultationFormProps {
  doctorId: string;
  fee?: number;
}

export default function BookConsultationForm({
  doctorId,
  fee = 0,
}: BookConsultationFormProps) {
  const [slot, setSlot] = useState("");
  const [duration, setDuration] = useState(30);
  const [mode, setMode] = useState<"online" | "offline">("online");
  const [notes, setNotes] = useState("");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 60);
    return now.toISOString().slice(0, 16);
  };

  const formatDateTime = (datetime: string) => {
    if (!datetime) return "";
    const date = new Date(datetime);
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateTotal = () => {
    const baseFee = fee || 0;
    const durationMultiplier = duration / 30;
    return Math.round(baseFee * durationMultiplier);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!slot) {
      setError("Please select a date and time");
      return;
    }

    const selectedDate = new Date(slot);
    const now = new Date();

    if (selectedDate <= now) {
      setError("Please select a future date and time");
      return;
    }

    startTransition(async () => {
      try {
        await bookConsultation({ doctorId, slot, duration, mode, notes });
        setSuccess(true);
        setSlot("");
        setDuration(30);
        setMode("online");
        setNotes("");
      } catch (err) {
        setError("Failed to book consultation. Please try again.");
      }
    });
  };

  if (success) {
    return (
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
        <Card className="relative border-0 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/80 dark:to-teal-950/80">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/50 dark:to-teal-900/50 rounded-full flex items-center justify-center border-4 border-cyan-200 dark:border-cyan-800">
                  <CheckCircle className="h-10 w-10 text-cyan-600 dark:text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent mb-2">
                  Consultation Booked Successfully!
                </h3>
                <p className="text-cyan-600 dark:text-cyan-400 text-sm mb-6 font-medium">
                  Your consultation has been scheduled. You will receive a
                  confirmation email shortly.
                </p>
                <Button
                  onClick={() => setSuccess(false)}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Book Another Consultation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl shadow-lg">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent font-black">
            Book Your Consultation
          </span>
        </CardTitle>
        <p className="text-sm text-muted-foreground font-medium">
          Schedule your appointment with the doctor
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert className="border-2 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700 dark:text-red-400 font-medium">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date & Time Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-bold text-cyan-700 dark:text-cyan-400">
              <Calendar className="h-4 w-4" />
              Select Date & Time
            </Label>
            <Input
              type="datetime-local"
              value={slot}
              min={getMinDateTime()}
              onChange={(e) => setSlot(e.target.value)}
              required
              className="text-base border-2 border-cyan-200 dark:border-cyan-800 focus:ring-cyan-500 focus:border-cyan-500"
            />
            {slot && (
              <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/50 dark:to-teal-950/50 p-3 rounded-xl border-2 border-cyan-200 dark:border-cyan-800">
                <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  Scheduled for: {formatDateTime(slot)}
                </p>
              </div>
            )}
          </div>

          {/* Duration Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-bold text-teal-700 dark:text-teal-400">
              <Clock className="h-4 w-4" />
              Consultation Duration
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map((mins) => (
                <Button
                  key={mins}
                  type="button"
                  variant={duration === mins ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDuration(mins)}
                  className={
                    duration === mins
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold border-0 shadow-lg"
                      : "border-2 border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:border-teal-400 dark:hover:border-teal-600 font-semibold"
                  }
                >
                  {mins} min
                </Button>
              ))}
            </div>
            <div className="text-xs text-muted-foreground font-medium">
              <Clock className="h-3 w-3 inline mr-1" />
              Selected: {duration} minutes
            </div>
          </div>

          {/* Mode Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-bold text-cyan-700 dark:text-cyan-400">
              <Sparkles className="h-4 w-4" />
              Consultation Mode
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={mode === "online" ? "default" : "outline"}
                onClick={() => setMode("online")}
                className={`h-auto p-5 flex flex-col gap-3 transition-all hover:scale-105 ${
                  mode === "online"
                    ? "bg-gradient-to-br from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white border-0 shadow-xl"
                    : "border-2 border-cyan-200 dark:border-cyan-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 hover:border-cyan-400 dark:hover:border-cyan-600"
                }`}
              >
                <div
                  className={`p-3 rounded-xl ${
                    mode === "online"
                      ? "bg-white/20"
                      : "bg-cyan-100 dark:bg-cyan-900/50"
                  }`}
                >
                  <Video
                    className={`h-6 w-6 ${
                      mode === "online"
                        ? "text-white"
                        : "text-cyan-600 dark:text-cyan-400"
                    }`}
                  />
                </div>
                <div className="text-center">
                  <div className="font-bold">Online</div>
                  <div className="text-xs opacity-90">Video Call</div>
                </div>
              </Button>

              <Button
                type="button"
                variant={mode === "offline" ? "default" : "outline"}
                onClick={() => setMode("offline")}
                className={`h-auto p-5 flex flex-col gap-3 transition-all hover:scale-105 ${
                  mode === "offline"
                    ? "bg-gradient-to-br from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-xl"
                    : "border-2 border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:border-teal-400 dark:hover:border-teal-600"
                }`}
              >
                <div
                  className={`p-3 rounded-xl ${
                    mode === "offline"
                      ? "bg-white/20"
                      : "bg-teal-100 dark:bg-teal-900/50"
                  }`}
                >
                  <MapPin
                    className={`h-6 w-6 ${
                      mode === "offline"
                        ? "text-white"
                        : "text-teal-600 dark:text-teal-400"
                    }`}
                  />
                </div>
                <div className="text-center">
                  <div className="font-bold">In-Person</div>
                  <div className="text-xs opacity-90">Clinic Visit</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-bold text-cyan-700 dark:text-cyan-400">
              <FileText className="h-4 w-4" />
              Additional Notes{" "}
              <span className="text-muted-foreground font-normal">
                (Optional)
              </span>
            </Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe your symptoms, concerns, or any specific questions you'd like to discuss..."
              className="resize-none border-2 border-cyan-200 dark:border-cyan-800 focus:ring-cyan-500 focus:border-cyan-500"
              rows={3}
            />
            <p className="text-xs text-muted-foreground font-medium">
              Providing details helps the doctor prepare for your consultation
            </p>
          </div>

          <Separator className="bg-cyan-200 dark:bg-cyan-800" />

          {/* Fee Summary */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/50 dark:to-teal-950/50 rounded-2xl p-5 border-2 border-cyan-200 dark:border-cyan-800 space-y-4">
              <h4 className="font-black text-lg flex items-center gap-2 bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                <IndianRupee className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                Consultation Summary
              </h4>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between font-medium">
                  <span>Base consultation fee</span>
                  <span className="text-cyan-700 dark:text-cyan-400">
                    ₹{fee || 0}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Duration ({duration} minutes)</span>
                  <span className="text-teal-700 dark:text-teal-400">
                    {duration / 30}x
                  </span>
                </div>
                <div className="flex justify-between items-center font-medium">
                  <span>Mode</span>
                  <Badge className="bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/50 dark:to-teal-900/50 text-cyan-700 dark:text-cyan-300 border-0 font-bold">
                    {mode === "online" ? (
                      <>
                        <Video className="h-3 w-3 mr-1" />
                        Online
                      </>
                    ) : (
                      <>
                        <MapPin className="h-3 w-3 mr-1" />
                        In-Person
                      </>
                    )}
                  </Badge>
                </div>
                <Separator className="bg-cyan-200 dark:bg-cyan-800" />
                <div className="flex justify-between font-black text-lg">
                  <span>Total Amount</span>
                  <span className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                    ₹{calculateTotal()}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Alert */}
            <Alert className="border-2 border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50">
              <Info className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <AlertDescription className="text-cyan-700 dark:text-cyan-300 text-sm font-medium">
                Payment will be processed after the doctor confirms your
                appointment.
              </AlertDescription>
            </Alert>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending || !slot}
            className="w-full h-12 text-base font-black bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Booking Consultation...
              </>
            ) : (
              <>
                <Calendar className="h-5 w-5 mr-2" />
                Book Consultation - ₹{calculateTotal()}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
