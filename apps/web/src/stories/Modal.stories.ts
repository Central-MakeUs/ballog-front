import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from '@/ui/Modal/modal';

const meta: Meta<typeof Modal> = {
  title: 'Shared/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const OverlayModal: Story = {
  args: {
    type: 'overlay',
    heading: 'Overlay Example',
    body: 'Overlay body content',
    dismissible: true,
    buttons: {
      layout: 'horizontal',
      items: [
        { label: 'Cancel', onClick: () => alert('Cancel') },
        { label: 'Confirm', onClick: () => alert('Confirm') },
      ],
    },
  },
};

export const BottomSheetModal: Story = {
  args: {
    type: 'bottomSheet',
    heading: 'BottomSheet Example',
    body: 'Bottom sheet content',
    hasImg: true,
    hasSubText: true,
    dismissible: true,
    buttons: {
      layout: 'vertical',
      items: [
        { label: 'OK', onClick: () => alert('OK') },
      ],
    },
  },
};
