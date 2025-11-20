"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Plus, Edit3, Trash2, Calendar, Clock, Save, X } from "lucide-react";

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
      const payload: any = { ...newAppointment };
      if (payload.date) {
        payload.date = new Date(payload.date);
      }
      await onEdit(editingId, payload);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400";
      case "completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "cancelled":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
      case "rescheduled":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h3
          className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Appointments
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button
            onClick={startAdd}
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule New Appointment
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300 font-medium">
                      Date
                    </Label>
                    <Input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300 font-medium">
                      Time
                    </Label>
                    <Input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300 font-medium">
                      Doctor
                    </Label>
                    <Input
                      value={newAppointment.doctor}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          doctor: e.target.value,
                        }))
                      }
                      placeholder="Doctor name"
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300 font-medium">
                      Type
                    </Label>
                    <Input
                      value={newAppointment.type}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      placeholder="Appointment type"
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300 font-medium">
                      Status
                    </Label>
                    <Select
                      value={newAppointment.status}
                      onValueChange={(value) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          status: value,
                        }))
                      }
                    >
                      <SelectTrigger className="border-slate-300 dark:border-slate-600 focus:border-cyan-500">
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
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300 font-medium">
                      Notes
                    </Label>
                    <Input
                      value={newAppointment.notes}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      placeholder="Additional notes"
                      className="border-slate-300 dark:border-slate-600 focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={saveAppointment}
                    disabled={loading}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </div>
                    ) : editingId ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Update Appointment
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Appointment
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={cancelAdd}
                    disabled={loading}
                    className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 text-cyan-600 dark:text-cyan-400">
                      <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {formatDate(appointment.date)}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                        {appointment.doctor}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        {appointment.type}
                      </div>
                      {appointment.notes && (
                        <div className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                          {appointment.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`${getStatusColor(
                        appointment.status
                      )} border-0 font-medium`}
                    >
                      {appointment.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(appointment)}
                        disabled={loading}
                        className="hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                      >
                        <Edit3 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(appointment.id)}
                        disabled={loading}
                        className="hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {appointments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  No Appointments
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                  You don't have any appointments scheduled yet. Schedule your
                  first appointment to get started with your healthcare journey.
                </p>
                <Button
                  onClick={startAdd}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Your First Appointment
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
