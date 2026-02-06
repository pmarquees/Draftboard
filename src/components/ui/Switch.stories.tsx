import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Switch } from "./switch";
import { Label } from "./label";
import { useState } from "react";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A toggle switch component for binary on/off settings. Built on Radix UI Switch for accessibility.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is on",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Switch with an associated label. Clicking the label toggles the switch.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off" className="text-muted-foreground">
          Disabled (off)
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on" className="text-muted-foreground">
          Disabled (on)
        </Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled switches cannot be toggled.",
      },
    },
  },
};

const ControlledSwitchDemo = () => {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch
          id="controlled"
          checked={enabled}
          onCheckedChange={setEnabled}
        />
        <Label htmlFor="controlled">
          Email notifications
        </Label>
      </div>
      <p className="text-sm text-muted-foreground">
        Status: {enabled ? "Enabled" : "Disabled"}
      </p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledSwitchDemo />,
  parameters: {
    docs: {
      description: {
        story: "Controlled switch with external state management.",
      },
    },
  },
};

export const SettingsForm: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="email-notif" className="text-sm font-medium">
            Email notifications
          </Label>
          <p className="text-xs text-muted-foreground">
            Receive email updates about your account.
          </p>
        </div>
        <Switch id="email-notif" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="push-notif" className="text-sm font-medium">
            Push notifications
          </Label>
          <p className="text-xs text-muted-foreground">
            Receive push notifications in your browser.
          </p>
        </div>
        <Switch id="push-notif" />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="marketing" className="text-sm font-medium">
            Marketing emails
          </Label>
          <p className="text-xs text-muted-foreground">
            Receive emails about new features and updates.
          </p>
        </div>
        <Switch id="marketing" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example settings form with multiple switch options.",
      },
    },
  },
};
