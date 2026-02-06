import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Switch } from "./switch";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An accessible label component for form fields. Built on Radix UI Label for proper accessibility.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email">Email address</Label>
      <Input type="email" id="email" placeholder="name@example.com" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Label paired with an input field. Clicking the label focuses the input.",
      },
    },
  },
};

export const WithTextarea: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Label paired with a textarea for multi-line input.",
      },
    },
  },
};

export const WithSwitch: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Label used alongside a switch for toggle options.",
      },
    },
  },
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="required-email">
        Email address <span className="text-destructive">*</span>
      </Label>
      <Input type="email" id="required-email" placeholder="name@example.com" required />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Label with a required indicator for mandatory fields.",
      },
    },
  },
};

export const WithDescription: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="johndoe" />
      <p className="text-xs text-muted-foreground">
        This will be your public display name.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Label with additional helper text below the input.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="disabled-input" className="text-muted-foreground">
        Disabled field
      </Label>
      <Input id="disabled-input" disabled placeholder="Cannot edit" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Label styling for disabled form fields.",
      },
    },
  },
};
