import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { ColorfulTagComponent } from './colorful-tag.component';

export default {
  title: 'Atoms/ColorfulTag',
  component: ColorfulTagComponent,
  decorators: [
    moduleMetadata({
      declarations: [ColorfulTagComponent],
    }),
  ],
} as Meta;

const Template: StoryFn<ColorfulTagComponent> = (args: ColorfulTagComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  text: 'Fire',
  type: 'fire',
};

export const WaterType = Template.bind({});
WaterType.args = {
  text: 'Water',
  type: 'water',
};

export const GrassType = Template.bind({});
GrassType.args = {
  text: 'Grass',
  type: 'grass',
};