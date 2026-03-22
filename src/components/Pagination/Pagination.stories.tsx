import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Artikit/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function PlaygroundStory(args) {
    const [page, setPage] = useState(2);
    return (
      <Pagination {...args} page={page} totalPages={args.totalPages ?? 5} onPageChange={setPage} />
    );
  },
  args: {
    page: 2,
    totalPages: 5,
    onPageChange: () => {},
    showPageNumbers: true,
    neighborCount: 1,
  },
};

export const ManyPages: Story = {
  render: function ManyPagesStory() {
    const [page, setPage] = useState(6);
    return (
      <Pagination
        page={page}
        totalPages={24}
        onPageChange={setPage}
        neighborCount={1}
        ariaLabel="Ledger pages"
      />
    );
  },
};
