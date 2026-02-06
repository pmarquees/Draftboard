import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";
import { Button } from "./button";
import { Plus, Settings, Trash2, Edit, Copy, Download } from "lucide-react";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A tooltip component for displaying brief helper text on hover. Built on Radix UI Tooltip.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips can appear on any side of the trigger element.",
      },
    },
  },
};

export const OnIconButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add new item</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Copy className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Download className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" className="text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tooltips are essential for icon-only buttons to explain their function.",
      },
    },
  },
};

export const WithKeyboardShortcut: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Save</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Save changes{" "}
            <kbd className="ml-1 px-1.5 py-0.5 bg-muted rounded text-xs">
              ⌘S
            </kbd>
          </p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Copy</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Copy selection{" "}
            <kbd className="ml-1 px-1.5 py-0.5 bg-muted rounded text-xs">
              ⌘C
            </kbd>
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips can include keyboard shortcuts for power users.",
      },
    },
  },
};

export const LongerContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Help</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[200px]">
        <p>
          This tooltip contains a longer explanation that wraps to multiple
          lines for more complex help text.
        </p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips with longer content can have a max-width set.",
      },
    },
  },
};

export const OnText: Story = {
  render: () => (
    <p className="text-sm">
      Read our{" "}
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="underline decoration-dotted cursor-help">
            terms of service
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to view full terms</p>
        </TooltipContent>
      </Tooltip>{" "}
      before continuing.
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips can be added to inline text elements.",
      },
    },
  },
};
