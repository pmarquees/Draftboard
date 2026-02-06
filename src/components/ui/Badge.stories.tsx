import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A badge component for displaying status, labels, and counts. Supports multiple variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "Visual style variant of the badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available badge variants for different contexts.",
      },
    },
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Published</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="outline">Pending</Badge>
      <Badge variant="destructive">Rejected</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example usage for content status indicators.",
      },
    },
  },
};

export const WithCount: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Notifications</span>
        <Badge>5</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Comments</span>
        <Badge variant="secondary">12</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Errors</span>
        <Badge variant="destructive">3</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges used as count indicators next to labels.",
      },
    },
  },
};

export const CategoryTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">Design</Badge>
      <Badge variant="outline">Development</Badge>
      <Badge variant="outline">Marketing</Badge>
      <Badge variant="outline">Research</Badge>
      <Badge variant="outline">Product</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Outline badges work well for category/tag lists.",
      },
    },
  },
};
