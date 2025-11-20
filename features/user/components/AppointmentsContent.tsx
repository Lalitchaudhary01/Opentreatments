"use client";

import { useState } from "react";
import { Appointment } from "../types/patient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit3, Trash2, Calendar, Clock } from "lucide-react";

interface AppointmentsContentProps {
  appointments: Appointment[];
  patientId: string;
  onAdd: (data: any) => Promise<boolean>;
  onEdit: (id: string, data: any) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

export default function AppointmentsContent({
  appointments,
  patientId,
  onAdd,
  onEdit,
  onDelete,
}: AppointmentsContentProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    doctor: "",
    type: "",
    status: "scheduled",
    notes: "",
  });

  const startAdd = () => {
    setIsAdding(true);
    setNewAppointment({
      date: "",
      time: "",
      doctor: "",
      type: "",
      status: "scheduled",
      notes: "",
    });
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const saveAppointment = async () => {
    setLoading(true);

    if (editingId) {
      await onEdit(editingId, newAppointment);
    } else {
      const payload: any = { patientId, ...newAppointment };
      payload.date = new Date(newAppointment.date);
      await onAdd(payload);
    }

    setLoading(false);
    cancelAdd();
  };

  const startEdit = (appointment: Appointment) => {
    setEditingId(appointment.id);
    setNewAppointment({
      date: new Date(appointment.date).toISOString().split("T")[0],
      time: appointment.time,
      doctor: appointment.doctor,
      type: appointment.type,
      status: appointment.status,
      notes: appointment.notes || "",
    });
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await onDelete(id);
    setLoading(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Appointments</h3>
        <Button onClick={startAdd} disabled={loading}>
          <Plus className="w-4 h-4 mr-2" />
          Schedule New Appointment
        </Button>
      </div>

      {(isAdding || editingId) && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) =>
                    setNewAppointment((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) =>
                    setNewAppointment((prev) => ({
                      ...prev,
                      time: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Doctor</Label>
                <Input
                  value={newAppointment.doctor}
                  onChange={(e) =>
                    setNewAppointment((prev) => ({
                      ...prev,
                      doctor: e.target.value,
                    }))
                  }
                  placeholder="Doctor name"
                />
              </div>
              <div>
                <Label>Type</Label>
                <Input
                  value={newAppointment.type}
                  onChange={(e) =>
                    setNewAppointment((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  placeholder="Appointment type"
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={newAppointment.status}
                  onValueChange={(value) =>
                    setNewAppointment((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="rescheduled">Rescheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>Notes</Label>
                <Input
                  value={newAppointment.notes}
                  onChange={(e) =>
                    setNewAppointment((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  placeholder="Additional notes"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={saveAppointment} disabled={loading}>
                {loading ? "Saving..." : editingId ? "Update" : "Add"}{" "}
                Appointment
              </Button>
              <Button variant="outline" onClick={cancelAdd} disabled={loading}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Calendar className="w-4 h-4" />
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatDate(appointment.date)}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {appointment.time}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {appointment.doctor}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.type}
                    </div>
                    {appointment.notes && (
                      <div className="text-sm text-gray-600 mt-1">
                        {appointment.notes}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      appointment.status === "scheduled"
                        ? "default"
                        : appointment.status === "completed"
                        ? "secondary"
                        : appointment.status === "cancelled"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {appointment.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(appointment)}
                    disabled={loading}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(appointment.id)}
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {appointments.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Appointments
              </h3>
              <p className="text-gray-500 mb-4">
                You don't have any appointments scheduled yet.
              </p>
              <Button onClick={startAdd}>
                <Plus className="w-4 h-4 mr-2" />
                Schedule Your First Appointment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
