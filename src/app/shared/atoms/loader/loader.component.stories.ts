import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { LoaderComponent } from './loader.component';

export default {
  title: 'Atoms/Loader',
  component: LoaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [LoaderComponent],
    }),
  ],
} as Meta;

const Template: StoryFn<LoaderComponent> = (args: LoaderComponent) => ({
  component: LoaderComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};