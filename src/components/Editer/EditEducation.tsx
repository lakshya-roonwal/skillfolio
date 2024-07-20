"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil,Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Education } from "@/types/Resume.type";

const EditEducation = ({
  educationaItems,
  setEducationaItems,
}: {
  educationaItems: Education[];
  setEducationaItems: Dispatch<SetStateAction<Education[]>>;
}) => {
  const [isAddEducationDialogOpen, setIsAddEducationDialogOpen] =
    useState(false);
  const [isEditEducationDialogOpen, setIsEditEducationDialogOpen] =
    useState(false);
  const [isDeleteEducationDialogOpen, setIsDeleteEducationDialogOpen] =
    useState(false);
  const [selectedEducationItem, setSelectedEducationItem] = useState<Education | null>(null);
  const [formState, setFormState] = useState({
    college: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleAddEducation = () => {
    setFormState({
      college: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });
    setIsAddEducationDialogOpen(true);
  };

  const handleEditEducation = (item: Education) => {
    setSelectedEducationItem(item);
    setFormState({
      college: item.college,
      degree: item.degree,
      startDate: item.startDate,
      endDate: item.endDate,
      location: item.location,
    });
    setIsEditEducationDialogOpen(true);
  };

  const handleDeleteEducation = (item: Education) => {
    setSelectedEducationItem(item);
    setIsDeleteEducationDialogOpen(true);
  };

  const handleSaveEducation = () => {
    if (selectedEducationItem) {
      setEducationaItems(
        educationaItems.map((item) =>
          item.id === selectedEducationItem.id
            ? { ...formState, id: item.id }
            : item
        )
      );
    } else {
      setEducationaItems([...educationaItems, { ...formState, id: Date.now() }]);
    }
    setIsAddEducationDialogOpen(false);
    setIsEditEducationDialogOpen(false);
    setSelectedEducationItem(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedEducationItem) {
      setEducationaItems(
        educationaItems.filter((item) => item.id !== selectedEducationItem.id)
      );
      setIsDeleteEducationDialogOpen(false);
      setSelectedEducationItem(null);
    }
  };

  return (
    <div className="flex h-auto w-full flex-col md:flex-row">
      <div className="border-r p-6 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Education</h2>
          <Button onClick={handleAddEducation} className="mb-4">
            Add Education
          </Button>
        </div>
        <div className="space-y-4">
          {educationaItems.map((item) => (
            <Card
              key={item.id}
              className="flex items-center justify-between p-2"
            >
              <div>
                <h3 className="text-lg font-bold">{item.college}</h3>
                <p className="text-muted-foreground">{item.degree}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEditEducation(item)}
                >
                  <Pencil/>
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteEducation(item)}
                >
                  <Trash2/>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog
        open={isAddEducationDialogOpen}
        onOpenChange={setIsAddEducationDialogOpen}
      >
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Add Education</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="college">College</Label>
              <Input
                id="college"
                placeholder="Enter college name"
                value={formState.college}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                placeholder="Enter degree name"
                value={formState.degree}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="text"
                value={formState.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="text"
                value={formState.endDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={formState.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddEducationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveEducation}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isEditEducationDialogOpen}
        onOpenChange={setIsEditEducationDialogOpen}
      >
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Edit Education</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="college">College</Label>
              <Input
                id="college"
                placeholder="Enter college name"
                value={formState.college}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                placeholder="Enter degree name"
                value={formState.degree}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="text"
                value={formState.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="text"
                value={formState.endDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={formState.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditEducationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveEducation}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDeleteEducationDialogOpen}
        onOpenChange={setIsDeleteEducationDialogOpen}
      >
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Delete Education</DialogTitle>
          </DialogHeader>
          <div>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-bold">
                {selectedEducationItem?.degree} at{" "}
                {selectedEducationItem?.college}
              </span>
              ?
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteEducationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditEducation;
