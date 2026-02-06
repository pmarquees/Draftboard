import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta = {
  title: "Foundation/Design Tokens",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

const ColorSwatch = ({
  name,
  variable,
  description,
}: {
  name: string;
  variable: string;
  description?: string;
}) => (
  <div className="flex items-center gap-4 p-3 rounded-lg border border-border">
    <div
      className="w-16 h-16 rounded-lg border border-border shadow-sm shrink-0"
      style={{ backgroundColor: `var(${variable})` }}
    />
    <div className="min-w-0">
      <p className="font-medium text-foreground">{name}</p>
      <code className="text-xs text-muted-foreground font-mono">{variable}</code>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  </div>
);

const ColorSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Color Tokens</h1>
        <p className="text-muted-foreground mt-2">
          Draftboard uses a warm, creative color palette that adapts between
          light and dark modes. All colors are defined as CSS custom properties.
        </p>
      </div>

      <ColorSection title="Base Colors">
        <ColorSwatch
          name="Background"
          variable="--color-background"
          description="Main page background"
        />
        <ColorSwatch
          name="Foreground"
          variable="--color-foreground"
          description="Primary text color"
        />
        <ColorSwatch
          name="Card"
          variable="--color-card"
          description="Card/surface background"
        />
        <ColorSwatch
          name="Card Foreground"
          variable="--color-card-foreground"
          description="Text on cards"
        />
        <ColorSwatch
          name="Popover"
          variable="--color-popover"
          description="Popover/dropdown background"
        />
        <ColorSwatch
          name="Popover Foreground"
          variable="--color-popover-foreground"
          description="Text in popovers"
        />
      </ColorSection>

      <ColorSection title="Brand Colors">
        <ColorSwatch
          name="Primary"
          variable="--color-primary"
          description="Primary actions, CTAs"
        />
        <ColorSwatch
          name="Primary Foreground"
          variable="--color-primary-foreground"
          description="Text on primary color"
        />
        <ColorSwatch
          name="Secondary"
          variable="--color-secondary"
          description="Secondary actions"
        />
        <ColorSwatch
          name="Secondary Foreground"
          variable="--color-secondary-foreground"
          description="Text on secondary"
        />
        <ColorSwatch
          name="Accent"
          variable="--color-accent"
          description="Accent highlights"
        />
        <ColorSwatch
          name="Accent Foreground"
          variable="--color-accent-foreground"
          description="Text on accent"
        />
      </ColorSection>

      <ColorSection title="Semantic Colors">
        <ColorSwatch
          name="Muted"
          variable="--color-muted"
          description="Muted backgrounds"
        />
        <ColorSwatch
          name="Muted Foreground"
          variable="--color-muted-foreground"
          description="Muted/secondary text"
        />
        <ColorSwatch
          name="Destructive"
          variable="--color-destructive"
          description="Error states, delete actions"
        />
        <ColorSwatch
          name="Destructive Foreground"
          variable="--color-destructive-foreground"
          description="Text on destructive"
        />
      </ColorSection>

      <ColorSection title="UI Colors">
        <ColorSwatch
          name="Border"
          variable="--color-border"
          description="Default border color"
        />
        <ColorSwatch
          name="Input"
          variable="--color-input"
          description="Input field borders"
        />
        <ColorSwatch
          name="Ring"
          variable="--color-ring"
          description="Focus ring color"
        />
      </ColorSection>
    </div>
  ),
};

const RadiusExample = ({ name, size }: { name: string; size: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="w-20 h-20 bg-primary"
      style={{ borderRadius: `var(${size})` }}
    />
    <div className="text-center">
      <p className="font-medium text-foreground text-sm">{name}</p>
      <code className="text-xs text-muted-foreground font-mono">{size}</code>
    </div>
  </div>
);

export const Radius: Story = {
  render: () => (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Border Radius</h1>
        <p className="text-muted-foreground mt-2">
          Consistent border radius tokens used throughout the design system.
        </p>
      </div>

      <div className="flex flex-wrap gap-8">
        <RadiusExample name="Small" size="--radius-sm" />
        <RadiusExample name="Medium" size="--radius-md" />
        <RadiusExample name="Large" size="--radius-lg" />
        <RadiusExample name="XL" size="--radius-xl" />
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-2">Radius Values</h4>
        <table className="text-sm w-full">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="pb-2">Token</th>
              <th className="pb-2">Value</th>
              <th className="pb-2">Usage</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            <tr>
              <td className="py-1">--radius-sm</td>
              <td>0.375rem (6px)</td>
              <td className="font-sans text-muted-foreground">
                Badges, small elements
              </td>
            </tr>
            <tr>
              <td className="py-1">--radius-md</td>
              <td>0.5rem (8px)</td>
              <td className="font-sans text-muted-foreground">
                Buttons, inputs
              </td>
            </tr>
            <tr>
              <td className="py-1">--radius-lg</td>
              <td>0.75rem (12px)</td>
              <td className="font-sans text-muted-foreground">
                Dialogs, popovers
              </td>
            </tr>
            <tr>
              <td className="py-1">--radius-xl</td>
              <td>1rem (16px)</td>
              <td className="font-sans text-muted-foreground">
                Cards, large containers
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Typography</h1>
        <p className="text-muted-foreground mt-2">
          Font families and type scale used in the design system.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold border-b border-border pb-2">
          Font Families
        </h3>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border">
            <p className="font-sans text-2xl">Inter (Sans Serif)</p>
            <code className="text-xs text-muted-foreground font-mono">
              --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif
            </code>
            <p className="mt-2 text-muted-foreground">
              Primary font for UI elements, body text, and headings.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border">
            <p className="font-mono text-2xl">JetBrains Mono</p>
            <code className="text-xs text-muted-foreground font-mono">
              --font-mono: "JetBrains Mono", ui-monospace, monospace
            </code>
            <p className="mt-2 text-muted-foreground font-sans">
              Used for code blocks, technical content, and tokens.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold border-b border-border pb-2">
          Type Scale
        </h3>

        <div className="space-y-4">
          {[
            { class: "text-xs", name: "Extra Small", size: "12px" },
            { class: "text-sm", name: "Small", size: "14px" },
            { class: "text-base", name: "Base", size: "16px" },
            { class: "text-lg", name: "Large", size: "18px" },
            { class: "text-xl", name: "XL", size: "20px" },
            { class: "text-2xl", name: "2XL", size: "24px" },
            { class: "text-3xl", name: "3XL", size: "30px" },
            { class: "text-4xl", name: "4XL", size: "36px" },
          ].map((item) => (
            <div
              key={item.class}
              className="flex items-baseline gap-4 p-3 rounded-lg border border-border"
            >
              <span className={item.class}>The quick brown fox</span>
              <span className="text-sm text-muted-foreground ml-auto">
                {item.name} ({item.size})
              </span>
              <code className="text-xs font-mono text-muted-foreground">
                {item.class}
              </code>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold border-b border-border pb-2">
          Font Weights
        </h3>

        <div className="space-y-4">
          {[
            { class: "font-normal", name: "Normal", weight: "400" },
            { class: "font-medium", name: "Medium", weight: "500" },
            { class: "font-semibold", name: "Semibold", weight: "600" },
            { class: "font-bold", name: "Bold", weight: "700" },
          ].map((item) => (
            <div
              key={item.class}
              className="flex items-center gap-4 p-3 rounded-lg border border-border"
            >
              <span className={`text-xl ${item.class}`}>
                The quick brown fox
              </span>
              <span className="text-sm text-muted-foreground ml-auto">
                {item.name} ({item.weight})
              </span>
              <code className="text-xs font-mono text-muted-foreground">
                {item.class}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Spacing</h1>
        <p className="text-muted-foreground mt-2">
          Spacing scale used for margins, padding, and gaps.
        </p>
      </div>

      <div className="space-y-4">
        {[
          { value: "0.5", px: "2px", name: "0.5" },
          { value: "1", px: "4px", name: "1" },
          { value: "1.5", px: "6px", name: "1.5" },
          { value: "2", px: "8px", name: "2" },
          { value: "3", px: "12px", name: "3" },
          { value: "4", px: "16px", name: "4" },
          { value: "5", px: "20px", name: "5" },
          { value: "6", px: "24px", name: "6" },
          { value: "8", px: "32px", name: "8" },
          { value: "10", px: "40px", name: "10" },
          { value: "12", px: "48px", name: "12" },
          { value: "16", px: "64px", name: "16" },
        ].map((item) => (
          <div
            key={item.value}
            className="flex items-center gap-4 p-2 rounded-lg border border-border"
          >
            <div
              className="bg-primary h-4 rounded shrink-0"
              style={{ width: item.px }}
            />
            <span className="font-medium w-12">{item.name}</span>
            <code className="text-xs font-mono text-muted-foreground">
              {item.px}
            </code>
            <code className="text-xs font-mono text-muted-foreground">
              p-{item.name}, m-{item.name}, gap-{item.name}
            </code>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Shadows</h1>
        <p className="text-muted-foreground mt-2">
          Shadow utilities for depth and elevation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { class: "shadow-sm", name: "Small Shadow" },
          { class: "shadow", name: "Default Shadow" },
          { class: "shadow-md", name: "Medium Shadow" },
          { class: "shadow-lg", name: "Large Shadow" },
          { class: "shadow-xl", name: "XL Shadow" },
          { class: "shadow-2xl", name: "2XL Shadow" },
        ].map((item) => (
          <div
            key={item.class}
            className={`p-6 bg-card rounded-lg border border-border ${item.class}`}
          >
            <p className="font-medium">{item.name}</p>
            <code className="text-xs font-mono text-muted-foreground">
              {item.class}
            </code>
          </div>
        ))}
      </div>
    </div>
  ),
};
