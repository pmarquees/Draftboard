import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Mail, Loader2, ChevronRight, Plus, Trash2 } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component with multiple variants, sizes, and states. Built on Radix UI Slot for composition.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "Visual style variant of the button",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "Size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    asChild: {
      control: "boolean",
      description: "Render as child element (for composition with links)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available button variants for different use cases.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button sizes from small to large, plus an icon-only variant.",
      },
    },
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Mail className="mr-2 h-4 w-4" />
        Login with Email
      </Button>
      <Button variant="outline">
        Continue
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
      <Button variant="destructive">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Buttons with leading or trailing icons using Lucide React icons.",
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loading state with spinner icon and disabled state.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Default Disabled</Button>
      <Button variant="secondary" disabled>
        Secondary Disabled
      </Button>
      <Button variant="outline" disabled>
        Outline Disabled
      </Button>
      <Button variant="destructive" disabled>
        Destructive Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled state reduces opacity and prevents interaction.",
      },
    },
  },
};

export const AsLink: Story = {
  render: () => (
    <Button asChild>
      <a href="https://example.com">Link styled as button</a>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Using asChild prop to render a link with button styling. Useful for navigation buttons.",
      },
    },
  },
};

export const IconButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button size="icon" variant="default">
        <Plus className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline">
        <Mail className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="destructive">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Square icon-only buttons for toolbar and compact UI.",
      },
    },
  },
};
