import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { WizardDialog } from './WizardDialog';

const steps = [
  { id: 'details', label: 'Details' },
  { id: 'team', label: 'Team' },
  { id: 'review', label: 'Review' },
];

const meta = {
  title: 'Artikit/WizardDialog',
  component: WizardDialog,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof WizardDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);

    return (
      <>
        <Button
          type="button"
          onClick={() => {
            setStep(0);
            setOpen(true);
          }}
        >
          Open wizard
        </Button>
        <WizardDialog
          open={open}
          onClose={() => setOpen(false)}
          title="New workspace"
          steps={steps}
          currentStep={step}
          onStepChange={setStep}
          onFinish={() => setOpen(false)}
        >
          <p style={{ margin: 0 }}>
            Step {step + 1}: {steps[step]?.label}
          </p>
        </WizardDialog>
      </>
    );
  },
  args: {
    open: false,
    onClose: () => {},
    steps,
    currentStep: 0,
    onStepChange: () => {},
    onFinish: () => {},
    children: null,
  },
};
