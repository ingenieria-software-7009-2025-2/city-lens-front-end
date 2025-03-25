import {Meta, StoryFn} from '@storybook/react';
import {Label} from './label';


export default {
    title: 'Componentes Básicos/Etiqueta',
    component: Label,
} as Meta<typeof Label>;

const Template: StoryFn<typeof Label> = (args) => <Label {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Texto de ejemplo',
};