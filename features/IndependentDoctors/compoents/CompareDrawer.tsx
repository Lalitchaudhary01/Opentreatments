// /features/doctors/components/CompareDrawer.tsx
import React from "react";
import { IndependentDoctor } from "../types/IndependentDoctor";

interface CompareDrawerProps {
  compareList: IndependentDoctor[];
  removeDoctor: (id: string) => void;
  onClose: () => void;
}

const CompareDrawer: React.FC<CompareDrawerProps> = ({
  compareList,
  removeDoctor,
  onClose,
}) => {
  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg border-l p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Compare Doctors</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>

      {compareList.length === 0 ? (
        <p className="text-gray-500">No doctors selected for comparison.</p>
      ) : (
        <div className="space-y-4">
          {compareList.map((doctor) => (
            <div key={doctor.id} className="border rounded p-3 shadow-sm">
              <div className="flex justify-between items-center">
                <span>{doctor.name}</span>
                <button
                  onClick={() => removeDoctor(doctor.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <p className="text-sm text-gray-600">{doctor.specialization}</p>
              <p className="text-sm text-yellow-500">⭐ {doctor.rating}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompareDrawer;
