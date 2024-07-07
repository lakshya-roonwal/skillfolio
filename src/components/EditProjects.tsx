"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const EditProjects = () => {
  const [projectItems, setProjectItems] = useState([
    {
      id: 1,
      title: "Project One",
      company: "Acme Inc",
      startDate: "2021-01-01",
      endDate: "2021-12-31",
      location: "Remote",
    },
    {
      id: 2,
      title: "Project Two",
      company: "Globex Corporation",
      startDate: "2020-01-01",
      endDate: "2020-12-31",
      location: "New York, NY",
    },
  ])
  
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false)
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false)
  const [isDeleteProjectDialogOpen, setIsDeleteProjectDialogOpen] = useState(false)
  const [selectedProjectItem, setSelectedProjectItem] = useState(null)

  const handleAddProject = () => {
    setIsAddProjectDialogOpen(true)
  }

  const handleEditProject = (item) => {
    setSelectedProjectItem(item)
    setIsEditProjectDialogOpen(true)
  }

  const handleDeleteProject = (item) => {
    setSelectedProjectItem(item)
    setIsDeleteProjectDialogOpen(true)
  }

  const handleSaveProject = (newItem) => {
    if (selectedProjectItem) {
      setProjectItems(projectItems.map((item) => (item.id === selectedProjectItem.id ? newItem : item)))
    } else {
      setProjectItems([...projectItems, { ...newItem, id: Date.now() }])
    }
    setIsAddProjectDialogOpen(false)
    setIsEditProjectDialogOpen(false)
    setSelectedProjectItem(null)
  }

  const handleDeleteConfirm = () => {
    setProjectItems(projectItems.filter((item) => item.id !== selectedProjectItem.id))
    setIsDeleteProjectDialogOpen(false)
    setSelectedProjectItem(null)
  }

  return (
    <div className="flex h-auto w-full flex-col md:flex-row">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center py-2">
          <h2 className="mb-4 text-2xl font-bold">Projects</h2>
          <Button onClick={handleAddProject} className="mb-4">
            Add Project
          </Button>
        </div>
        <div className="space-y-4">
          {projectItems.map((item) => (
            <Card key={item.id} className="flex items-center justify-between p-2">
              <div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.company}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditProject(item)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(item)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <Dialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter project title" />
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
            <Button variant="outline" onClick={() => setIsAddProjectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={(values) => handleSaveProject(values)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditProjectDialogOpen} onOpenChange={setIsEditProjectDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter project title" defaultValue={selectedProjectItem?.title} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Enter company name" defaultValue={selectedProjectItem?.company} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" defaultValue={selectedProjectItem?.startDate} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" defaultValue={selectedProjectItem?.endDate} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter location" defaultValue={selectedProjectItem?.location} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProjectDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={(values) =>
                handleSaveProject({
                  id: selectedProjectItem.id,
                  title: values.title,
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
      
      <Dialog open={isDeleteProjectDialogOpen} onOpenChange={setIsDeleteProjectDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
          </DialogHeader>
          <div>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-bold">
                {selectedProjectItem?.title} at {selectedProjectItem?.company}
              </span>
              ?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteProjectDialogOpen(false)}>
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

export default EditProjects
    