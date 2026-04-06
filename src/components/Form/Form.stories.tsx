import type { Meta, StoryObj } from '@storybook/react';
import { Form, FormItem } from './Form';
import { useForm } from './useForm';
import { Input, Textarea, Select } from '../Input/Input';
import { Checkbox } from '../Checkbox/Checkbox';
import { Button } from '../Button/Button';

const meta: Meta<typeof Form> = {
  title: 'Artikit/Form',
  component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;

export const BasicValidation: Story = {
  name: 'Basic validation',
  render: () => {
    const [form] = useForm();

    return (
      <div style={{ maxWidth: 400 }}>
        <Form
          form={form}
          initialValues={{ questName: '', description: '' }}
          onFinish={(values) => alert(`Submitted:\n${JSON.stringify(values, null, 2)}`)}
          onFinishFailed={(errors) => console.log('Validation failed:', errors)}
        >
          <FormItem
            name="questName"
            label="Quest Name"
            rules={[
              { required: true, message: 'Every quest needs a name' },
              { min: 3, message: 'At least 3 characters' },
            ]}
          >
            <Input id="questName" placeholder="Enter quest name…" />
          </FormItem>
          <FormItem
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Describe the quest' }]}
            help="A brief overview of the quest objectives."
          >
            <Textarea id="description" placeholder="Describe the quest…" />
          </FormItem>
          <FormItem
            name="difficulty"
            label="Difficulty"
            rules={[{ required: true, message: 'Pick a difficulty' }]}
          >
            <Select
              id="difficulty"
              placeholder="Select difficulty…"
              options={[
                { value: 'easy', label: 'Easy' },
                { value: 'medium', label: 'Medium' },
                { value: 'hard', label: 'Hard' },
                { value: 'legendary', label: 'Legendary' },
              ]}
            />
          </FormItem>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="ghost" type="reset" onClick={() => form.resetFields()}>
              Reset
            </Button>
            <Button variant="submit">Create quest</Button>
          </div>
        </Form>
      </div>
    );
  },
};

export const HorizontalLayout: Story = {
  name: 'Horizontal layout',
  render: () => {
    const [form] = useForm();

    return (
      <div style={{ maxWidth: 600 }}>
        <Form
          form={form}
          layout="horizontal"
          initialValues={{ name: '', email: '', role: 'warrior' }}
          onFinish={(values) => alert(JSON.stringify(values, null, 2))}
        >
          <FormItem
            name="name"
            label="Character"
            rules={[{ required: true }]}
          >
            <Input id="name" placeholder="Character name…" />
          </FormItem>
          <FormItem
            name="email"
            label="Scroll Address"
            rules={[
              { required: true },
              { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid scroll address' },
            ]}
          >
            <Input id="email" placeholder="you@realm.com" type="email" />
          </FormItem>
          <FormItem name="role" label="Class">
            <Select
              id="role"
              options={[
                { value: 'warrior', label: 'Warrior' },
                { value: 'mage', label: 'Mage' },
                { value: 'rogue', label: 'Rogue' },
                { value: 'cleric', label: 'Cleric' },
              ]}
            />
          </FormItem>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="submit">Enlist</Button>
          </div>
        </Form>
      </div>
    );
  },
};

export const InlineLayout: Story = {
  name: 'Inline layout',
  render: () => {
    const [form] = useForm();

    return (
      <Form
        form={form}
        layout="inline"
        onFinish={(values) => alert(JSON.stringify(values, null, 2))}
      >
        <FormItem
          name="search"
          label="Search"
          rules={[{ required: true, message: 'Enter a search term' }]}
        >
          <Input id="search" placeholder="Search quests…" />
        </FormItem>
        <FormItem name="status" label="Status">
          <Select
            id="status"
            options={[
              { value: 'all', label: 'All' },
              { value: 'active', label: 'Active' },
              { value: 'completed', label: 'Completed' },
            ]}
          />
        </FormItem>
        <Button variant="submit" size="sm">Filter</Button>
      </Form>
    );
  },
};

export const PatternValidation: Story = {
  name: 'Pattern & custom validation',
  render: () => {
    const [form] = useForm();

    return (
      <div style={{ maxWidth: 400 }}>
        <Form
          form={form}
          initialValues={{ password: '', confirm: '' }}
          onFinish={(values) => alert('Account created!')}
        >
          <FormItem
            name="password"
            label="Password"
            rules={[
              { required: true },
              { min: 8, message: 'At least 8 characters' },
              { pattern: /[A-Z]/, message: 'Must contain an uppercase letter' },
            ]}
          >
            <Input id="password" type="password" placeholder="Choose a password…" />
          </FormItem>
          <FormItem
            name="confirm"
            label="Confirm Password"
            rules={[
              { required: true, message: 'Confirm your password' },
              {
                validator: (value, values) => {
                  if (value !== values.password) return 'Passwords do not match';
                  return null;
                },
              },
            ]}
          >
            <Input id="confirm" type="password" placeholder="Repeat password…" />
          </FormItem>
          <Button variant="submit">Create Account</Button>
        </Form>
      </div>
    );
  },
};

export const ExternalFormControl: Story = {
  name: 'External form control',
  render: () => {
    const [form] = useForm();

    return (
      <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Form
          form={form}
          initialValues={{ material: 'iron' }}
          onFinish={(values) => alert(JSON.stringify(values, null, 2))}
        >
          <FormItem name="material" label="Material" rules={[{ required: true }]}>
            <Select
              id="material"
              options={[
                { value: 'iron', label: 'Iron Ingot' },
                { value: 'steel', label: 'Steel Bar' },
                { value: 'mithril', label: 'Mithril Ore' },
              ]}
            />
          </FormItem>
          <FormItem name="notes" label="Notes">
            <Textarea id="notes" placeholder="Optional notes…" rows={2} />
          </FormItem>
          <Button variant="submit">Forge</Button>
        </Form>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" size="sm" onClick={() => form.setFieldValue('material', 'mithril')}>
            Set Mithril
          </Button>
          <Button variant="ghost" size="sm" onClick={() => form.resetFields()}>
            Reset All
          </Button>
          <Button variant="outline" size="sm" onClick={() => alert(JSON.stringify(form.getFieldsValue(), null, 2))}>
            Get Values
          </Button>
        </div>
      </div>
    );
  },
};
