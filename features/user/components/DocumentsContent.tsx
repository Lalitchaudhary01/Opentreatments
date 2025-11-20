"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Upload, Trash2 } from "lucide-react";

interface Document {
  id: number;
  name: string;
  date: string;
  type: string;
  size: string;
}

export default function DocumentsContent() {
  const [isAdding, setIsAdding] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "Blood Test Results - Jan 2024.pdf",
      date: "15 Jan 2024",
      type: "Lab Report",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "X-Ray Chest - Dec 2023.pdf",
      date: "5 Dec 2023",
      type: "Imaging",
      size: "5.7 MB",
    },
    {
      id: 3,
      name: "Prescription - Nov 2023.pdf",
      date: "20 Nov 2023",
      type: "Prescription",
      size: "1.2 MB",
    },
  ]);

  const [newDocument, setNewDocument] = useState<Partial<Document>>({
    name: "",
    date: "",
    type: "",
    size: "",
  });

  const addDocument = () => {
    if (newDocument.name && newDocument.date) {
      const doc: Document = {
        id: Math.max(...documents.map((d) => d.id)) + 1,
        name: newDocument.name || "",
        date: newDocument.date || "",
        type: newDocument.type || "Document",
        size: newDocument.size || "0 MB",
      };
      setDocuments([...documents, doc]);
      setNewDocument({ name: "", date: "", type: "", size: "" });
      setIsAdding(false);
    }
  };

  const deleteDocument = (id: number) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const updateDocument = (id: number, field: keyof Document, value: string) => {
    setDocuments(
      documents.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Medical Documents
        </h3>
        <Button onClick={() => setIsAdding(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Document Name</Label>
                <Input
                  value={newDocument.name}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, name: e.target.value })
                  }
                  placeholder="e.g., Blood Test Results"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  value={newDocument.date}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, date: e.target.value })
                  }
                  placeholder="DD MMM YYYY"
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select
                  value={newDocument.type}
                  onValueChange={(value) =>
                    setNewDocument({ ...newDocument, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lab Report">Lab Report</SelectItem>
                    <SelectItem value="Imaging">Imaging</SelectItem>
                    <SelectItem value="Prescription">Prescription</SelectItem>
                    <SelectItem value="Medical Certificate">
                      Medical Certificate
                    </SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Size</Label>
                <Input
                  value={newDocument.size}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, size: e.target.value })
                  }
                  placeholder="e.g., 2.4 MB"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addDocument}>Add Document</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div className="flex-1">
                    <Input
                      value={doc.name}
                      onChange={(e) =>
                        updateDocument(doc.id, "name", e.target.value)
                      }
                      className="border-none p-0 font-semibold text-gray-900 dark:text-white"
                    />
                    <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <Select
                        value={doc.type}
                        onValueChange={(value) =>
                          updateDocument(doc.id, "type", value)
                        }
                      >
                        <SelectTrigger className="w-32 h-6 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Lab Report">Lab Report</SelectItem>
                          <SelectItem value="Imaging">Imaging</SelectItem>
                          <SelectItem value="Prescription">
                            Prescription
                          </SelectItem>
                          <SelectItem value="Medical Certificate">
                            Medical Certificate
                          </SelectItem>
                          <SelectItem value="Insurance">Insurance</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={doc.date}
                        onChange={(e) =>
                          updateDocument(doc.id, "date", e.target.value)
                        }
                        className="w-24 h-6 text-xs"
                      />
                      <Input
                        value={doc.size}
                        onChange={(e) =>
                          updateDocument(doc.id, "size", e.target.value)
                        }
                        className="w-16 h-6 text-xs"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteDocument(doc.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
