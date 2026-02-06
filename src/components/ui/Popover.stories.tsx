import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Settings } from "lucide-react";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A floating popover component for displaying additional content on demand. Built on Radix UI Popover.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithSettings: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-sm text-muted-foreground">
              Manage your preferences.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Notifications</Label>
              <Input type="checkbox" className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <Label>Dark Mode</Label>
              <Input type="checkbox" className="h-4 w-4" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: "Popover with settings or preferences content.",
      },
    },
  },
};

export const Alignment: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-60">
          <p className="text-sm">This popover is aligned to the start.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-60">
          <p className="text-sm">This popover is aligned to the center.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align End</Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-60">
          <p className="text-sm">This popover is aligned to the end.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Popovers with different alignment options.",
      },
    },
  },
};

export const SimpleInfo: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="text-sm">
          What is this?
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <p className="text-sm text-muted-foreground">
          This is a helpful explanation that appears when you click on the
          trigger. Popovers are useful for providing additional context without
          cluttering the main UI.
        </p>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple popover for displaying informational text.",
      },
    },
  },
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Quick Add</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Item</h4>
            <p className="text-sm text-muted-foreground">
              Quickly add a new item to your list.
            </p>
          </div>
          <div className="grid gap-2">
            <Input placeholder="Item name" />
            <Button size="sm">Add</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: "Popover containing a quick-add form.",
      },
    },
  },
};
