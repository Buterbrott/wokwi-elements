import { html } from 'lit';
import './neopixel-star-element';

export default {
  title: 'Neopixel Star',
  component: 'wokwi-neopixel-star',
  argTypes: {
    animation: { control: 'boolean' },
    pixels: { control: { type: 'number', min: 1, max: 64, step: 1 } },
    pixelSpacing: { control: { type: 'range', min: 0, max: 10, step: 0.1 } },
    background: { control: { type: 'color' } },
    pinInfo: { control: { type: null } },
  },
  args: {
    background: '#363',
    pixels: 16,
    pixelSpacing: 0,
    animation: true,
  },
};

const Template = ({ animation, background, pixels, pixelSpacing }) =>
  html`<wokwi-neopixel-star
    .animation=${animation}
    background=${background}
    pixels=${pixels}
    pixelSpacing=${pixelSpacing}
  ></wokwi-neopixel-star>`;

export const Default = Template.bind({});
Default.args = { pixels: 180 };