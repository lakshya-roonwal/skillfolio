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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import { FiX } from "react-icons/fi"; // Importing 'react-icons' for the remove icon

const EditExperience = ({experienceItems, setExperienceItems}) => {
  console.log(experienceItems)
  const [isAddExperienceDialogOpen, setIsAddExperienceDialogOpen] = useState(false);
  const [isEditExperienceDialogOpen, setIsEditExperienceDialogOpen] = useState(false);
  const [isDeleteExperienceDialogOpen, setIsDeleteExperienceDialogOpen] = useState(false);
  const [selectedExperienceItem, setSelectedExperienceItem] = useState(null);
  const [formState, setFormState] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    location: "",
    details: "",
  });

  const handleAddExperience = () => {
    setFormState({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      location: "",
      details: "",
    });
    setIsAddExperienceDialogOpen(true);
  };

  const handleEditExperience = (item) => {
    setSelectedExperienceItem(item);
    setFormState({
      role: item.role,
      company: item.company,
      startDate: item.startDate,
      endDate: item.endDate,
      location: item.location,
      details: item.details.join("\n") || "", // Convert array to string with new lines
    });
    setIsEditExperienceDialogOpen(true);
  };

  const handleDeleteExperience = (item) => {
    setSelectedExperienceItem(item);
    setIsDeleteExperienceDialogOpen(true);
  };

  const handleSaveExperience = () => {
    const newItem = {
      id: selectedExperienceItem ? selectedExperienceItem.id : Date.now(),
      role: formState.role,
      company: formState.company,
      startDate: formState.startDate,
      endDate: formState.endDate,
      location: formState.location,
      details: formState.details.split("\n").filter((detail) => detail.trim() !== ""), // Split by new lines and filter empty strings
    };

    if (selectedExperienceItem) {
      setExperienceItems(experienceItems.map((item) =>
        item.id === selectedExperienceItem.id ? newItem : item
      ));
    } else {
      setExperienceItems([...experienceItems, newItem]);
    }

    setIsAddExperienceDialogOpen(false);
    setIsEditExperienceDialogOpen(false);
    setSelectedExperienceItem(null);
  };

  const handleDeleteConfirm = () => {
    setExperienceItems(experienceItems.filter((item) => item.id !== selectedExperienceItem.id));
    setIsDeleteExperienceDialogOpen(false);
    setSelectedExperienceItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-auto w-full flex-col md:flex-row">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center py-2">
          <h2 className="mb-4 text-2xl font-bold">Experience</h2>
          <Button onClick={handleAddExperience} className="mb-4">
            Add Experience
          </Button>
        </div>
        <div className="space-y-4">
          {experienceItems.map((item) => (
            <Card key={item.id} className="flex items-center justify-between p-2">
              <div>
                <h3 className="text-lg font-bold">{item.role}</h3>
                <p className="text-muted-foreground">{item.company}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditExperience(item)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteExperience(item)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Experience Dialog */}
      <Dialog open={isAddExperienceDialogOpen} onOpenChange={setIsAddExperienceDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
          </DialogHeader>
          <DialogContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  value={formState.role}
                  placeholder="Enter role"
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formState.company}
                  placeholder="Enter company name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="text"
                  value={formState.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="text"
                  value={formState.endDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formState.location}
                  placeholder="Enter location"
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="details">Details</Label>
                <Textarea
                  id="details"
                  name="details"
                  value={formState.details}
                  placeholder="Enter details separated by new lines"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddExperienceDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveExperience}
            >
              Save
            </Button>
          </DialogFooter>
          </DialogContent>
        </DialogContent>
      </Dialog>

      {/* Edit Experience Dialog */}
      <Dialog open={isEditExperienceDialogOpen} onOpenChange={setIsEditExperienceDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Edit Experience</DialogTitle>
          </DialogHeader>
          <DialogContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  value={formState.role}
                  placeholder="Enter role"
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formState.company}
                  placeholder="Enter company name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="text"
                  value={formState.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="text"
                  value={formState.endDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formState.location}
                  placeholder="Enter location"
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="details">Details</Label>
                <Textarea
                  id="details"
                  name="details"
                  value={formState.details}
                  placeholder="Enter details separated by new lines"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditExperienceDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveExperience}
            >
              Save
            </Button>
          </DialogFooter>
          </DialogContent>
        </DialogContent>
      </Dialog>

      {/* Delete Experience Dialog */}
      <Dialog open={isDeleteExperienceDialogOpen} onOpenChange={setIsDeleteExperienceDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Delete Experience</DialogTitle>
          </DialogHeader>
          <div>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-bold">
                {selectedExperienceItem?.role} at {selectedExperienceItem?.company}
              </span>
              ?
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteExperienceDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditExperience;
