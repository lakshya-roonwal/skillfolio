"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const EditEducation = () => {
  const [educationItems, setEducationItems] = useState([
    {
      id: 1,
      college: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
    },
    {
      id: 2,
      college: "Massachusetts Institute of Technology",
      degree: "Master of Science in Electrical Engineering",
    },
  ]);
  const [isAddEducationDialogOpen, setIsAddEducationDialogOpen] =
    useState(false);
  const [isEditEducationDialogOpen, setIsEditEducationDialogOpen] =
    useState(false);
  const [isDeleteEducationDialogOpen, setIsDeleteEducationDialogOpen] =
    useState(false);
  const [selectedEducationItem, setSelectedEducationItem] = useState(null);
  const handleAddEducation = () => {
    setIsAddEducationDialogOpen(true);
  };
  const handleEditEducation = (item) => {
    setSelectedEducationItem(item);
    setIsEditEducationDialogOpen(true);
  };
  const handleDeleteEducation = (item) => {
    setSelectedEducationItem(item);
    setIsDeleteEducationDialogOpen(true);
  };
  const handleSaveEducation = (newItem) => {
    if (selectedEducationItem) {
      setEducationItems(
        educationItems.map((item) =>
          item.id === selectedEducationItem.id ? newItem : item
        )
      );
    } else {
      setEducationItems([...educationItems, { ...newItem, id: Date.now() }]);
    }
    setIsAddEducationDialogOpen(false);
    setIsEditEducationDialogOpen(false);
    setSelectedEducationItem(null);
  };
  const handleDeleteConfirm = () => {
    setEducationItems(
      educationItems.filter((item) => item.id !== selectedEducationItem.id)
    );
    setIsDeleteEducationDialogOpen(false);
    setSelectedEducationItem(null);
  };
  return (
    <div className="flex h-auto w-full flex-col md:flex-row border">
      <div className="border-r p-6 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Education</h2>
          <Button onClick={handleAddEducation} className="mb-4">
            Add Education
          </Button>
        </div>
        <div className="space-y-4">
          {educationItems.map((item) => (
            <Card key={item.id} className="flex items-center justify-between p-2">
              <div>
                <h3 className="text-lg font-bold">{item.degree}</h3>
                <p className="text-muted-foreground">{item.college}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditEducation(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteEducation(item)}
                >
                  Delete
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
              <Input id="college" placeholder="Enter college name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="degree">Degree</Label>
              <Input id="degree" placeholder="Enter degree name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter location" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddEducationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={(values) => handleSaveEducation(values)}>
              Save
            </Button>
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
                defaultValue={selectedEducationItem?.college}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                placeholder="Enter degree name"
                defaultValue={selectedEducationItem?.degree}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter location" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditEducationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={(values) =>
                handleSaveEducation({
                  id: selectedEducationItem.id,
                  college: values.college,
                  degree: values.degree,
                })
              }
            >
              Save
            </Button>
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
