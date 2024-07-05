"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const EditExperience = () => {
    const [experienceItems, setExperienceItems] = useState([
        {
          id: 1,
          role: "Software Engineer",
          company: "Acme Inc",
          startDate: "2020-06-01",
          endDate: "2022-12-31",
          location: "San Francisco, CA",
        },
        {
          id: 2,
          role: "Frontend Developer",
          company: "Globex Corporation",
          startDate: "2018-01-01",
          endDate: "2020-05-31",
          location: "New York, NY",
        },
      ])
      const [isAddExperienceDialogOpen, setIsAddExperienceDialogOpen] = useState(false)
      const [isEditExperienceDialogOpen, setIsEditExperienceDialogOpen] = useState(false)
      const [isDeleteExperienceDialogOpen, setIsDeleteExperienceDialogOpen] = useState(false)
      const [selectedExperienceItem, setSelectedExperienceItem] = useState(null)
      const handleAddExperience = () => {
        setIsAddExperienceDialogOpen(true)
      }
      const handleEditExperience = (item) => {
        setSelectedExperienceItem(item)
        setIsEditExperienceDialogOpen(true)
      }
      const handleDeleteExperience = (item) => {
        setSelectedExperienceItem(item)
        setIsDeleteExperienceDialogOpen(true)
      }
      const handleSaveExperience = (newItem) => {
        if (selectedExperienceItem) {
          setExperienceItems(experienceItems.map((item) => (item.id === selectedExperienceItem.id ? newItem : item)))
        } else {
          setExperienceItems([...experienceItems, { ...newItem, id: Date.now() }])
        }
        setIsAddExperienceDialogOpen(false)
        setIsEditExperienceDialogOpen(false)
        setSelectedExperienceItem(null)
      }
      const handleDeleteConfirm = () => {
        setExperienceItems(experienceItems.filter((item) => item.id !== selectedExperienceItem.id))
        setIsDeleteExperienceDialogOpen(false)
        setSelectedExperienceItem(null)
      }
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
          <Dialog open={isAddExperienceDialogOpen} onOpenChange={setIsAddExperienceDialogOpen}>
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle>Add Experience</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="Enter role" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Enter company name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddExperienceDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={(values) => handleSaveExperience(values)}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isEditExperienceDialogOpen} onOpenChange={setIsEditExperienceDialogOpen}>
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle>Edit Experience</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="Enter role" defaultValue={selectedExperienceItem?.role} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Enter company name" defaultValue={selectedExperienceItem?.company} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" defaultValue={selectedExperienceItem?.startDate} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" defaultValue={selectedExperienceItem?.endDate} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location" defaultValue={selectedExperienceItem?.location} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditExperienceDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={(values) =>
                    handleSaveExperience({
                      id: selectedExperienceItem.id,
                      role: values.role,
                      company: values.company,
                      startDate: values.startDate,
                      endDate: values.endDate,
                      location: values.location,
                    })
                  }
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                <Button variant="outline" onClick={() => setIsDeleteExperienceDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteConfirm}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )
    }

export default EditExperience