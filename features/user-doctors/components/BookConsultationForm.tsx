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
  User,
  Stethoscope,
  Phone,
  Monitor,
  AlertCircle,
  Info,
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

  // Get minimum date (today)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 60); // At least 1 hour from now
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
    const durationMultiplier = duration / 30; // Base duration is 30 minutes
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
        // Reset form
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
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Consultation Booked Successfully! 🎉
              </h3>
              <p className="text-green-600 text-sm mb-4">
                Your consultation has been scheduled. You will receive a
                confirmation email shortly.
              </p>
              <Button
                onClick={() => setSuccess(false)}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                Book Another Consultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calendar className="h-5 w-5 text-primary" />
          Book Your Consultation
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Schedule your appointment with the doctor
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date & Time Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4 text-primary" />
              Select Date & Time
            </Label>
            <Input
              type="datetime-local"
              value={slot}
              min={getMinDateTime()}
              onChange={(e) => setSlot(e.target.value)}
              required
              className="text-base focus:ring-primary/20"
            />
            {slot && (
              <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                📅 Scheduled for: <strong>{formatDateTime(slot)}</strong>
              </p>
            )}
          </div>

          {/* Duration Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4 text-blue-500" />
              Consultation Duration
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 30, 45, 60].map((mins) => (
                <Button
                  key={mins}
                  type="button"
                  variant={duration === mins ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDuration(mins)}
                  className={
                    duration === mins
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "hover:bg-blue-50"
                  }
                >
                  {mins} min
                </Button>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              <Clock className="h-3 w-3 inline mr-1" />
              Selected: {duration} minutes
            </div>
          </div>

          {/* Mode Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Consultation Mode</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={mode === "online" ? "default" : "outline"}
                onClick={() => setMode("online")}
                className={`h-auto p-4 flex flex-col gap-2 ${
                  mode === "online"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "hover:bg-green-50 border-green-200"
                }`}
              >
                <Video
                  className={`h-5 w-5 ${
                    mode === "online" ? "text-white" : "text-green-600"
                  }`}
                />
                <div className="text-center">
                  <div className="font-medium">Online</div>
                  <div className="text-xs opacity-90">Video Call</div>
                </div>
              </Button>

              <Button
                type="button"
                variant={mode === "offline" ? "default" : "outline"}
                onClick={() => setMode("offline")}
                className={`h-auto p-4 flex flex-col gap-2 ${
                  mode === "offline"
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "hover:bg-orange-50 border-orange-200"
                }`}
              >
                <MapPin
                  className={`h-5 w-5 ${
                    mode === "offline" ? "text-white" : "text-orange-600"
                  }`}
                />
                <div className="text-center">
                  <div className="font-medium">In-Person</div>
                  <div className="text-xs opacity-90">Clinic Visit</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4 text-purple-500" />
              Additional Notes{" "}
              <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe your symptoms, concerns, or any specific questions you'd like to discuss..."
              className="resize-none focus:ring-purple-500/20"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              💡 Providing details helps the doctor prepare for your
              consultation
            </p>
          </div>

          <Separator />

          {/* Fee Summary */}
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-green-600" />
                Consultation Summary
              </h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base consultation fee</span>
                  <span>₹{fee || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration ({duration} minutes)</span>
                  <span>{duration / 30}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Mode</span>
                  <Badge variant="outline" className="text-xs">
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
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total Amount</span>
                  <span className="text-green-600">₹{calculateTotal()}</span>
                </div>
              </div>
            </div>

            {/* Info Alert */}
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 text-sm">
                Payment will be processed after the doctor confirms your
                appointment.
              </AlertDescription>
            </Alert>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending || !slot}
            className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
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
