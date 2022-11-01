import { html, LitElement, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ElementPin } from './pin';
import { RGB } from './types/rgb';
import { mmToPix } from './utils/units';

@customElement('wokwi-neopixel-star')
export class NeopixelStarElement extends LitElement {

  @property() pixels = 16;
  @property({ type: Number }) pixelSpacing = 0;
  @property() background = '#363';
  @property() animation = false;

  private pixelElements: SVGCircleElement[] | null = null;
  private animationFrame: number | null = null;

  get pinInfo(): ElementPin[] {
    const pinSpacing = 2.54;
    const p = pinSpacing * mmToPix;
    const cx = 50 * mmToPix;
    const y = 50 * mmToPix;

    return [
      {
        name: 'GND',
        x: cx - 1.5 * p,
        y,
        signals: [{ type: 'power', signal: 'GND' }],
      },
      { name: 'VCC', x: cx - 0.5 * p, y, signals: [{ type: 'power', signal: 'VCC' }] },
      { name: 'DIN', x: cx + 0.5 * p, y, signals: [] },
      { name: 'DOUT', x: cx + 1.5 * p, y, signals: [] },
    ];
  }

  private getPixelElements() {
    if (!this.shadowRoot) {
      return null;
    }
    if (!this.pixelElements) {
      this.pixelElements = Array.from(this.shadowRoot.querySelectorAll('rect.pixel'));
    }
    return this.pixelElements;
  }

  setPixel(pixel: number, { r, g, b }: RGB) {
    const pixelElements = this.getPixelElements();
    if (!pixelElements) {
      return;
    }

    if (pixel < 0 || pixel >= pixelElements.length) {
      return;
    }
    pixelElements[pixel].style.fill = `rgb(${r * 255},${g * 255},${b * 255})`;
  }

  reset() {
    const pixelElements = this.getPixelElements();
    for (const element of pixelElements ?? []) {
      element.style.fill = '';
    }
  }

  private animateStep = () => {
    const time = new Date().getTime();
    const { pixels } = this;
    const pixelValue = (n: number) => (n % 2000 > 1000 ? 1 - (n % 1000) / 1000 : (n % 1000) / 1000);
    for (let pixel = 0; pixel < pixels; pixel++) {
      this.setPixel(pixel, {
        r: pixelValue(pixel * 100 + time),
        g: pixelValue(pixel * 100 + time + 200),
        b: pixelValue(pixel * 100 + time + 400),
      });
    }
    this.animationFrame = requestAnimationFrame(this.animateStep);
  };

  updated() {
    if (this.animation && !this.animationFrame) {
      this.animationFrame = requestAnimationFrame(this.animateStep);
    } else if (!this.animation && this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  render() {
    const { pixels, radius, background } = this;
    const pixelElements = [];
    this.pixelElements = null; 
    return html`
      <svg
        width="210mm"
        height="297mm"
        version="1.1"
        viewBox="0 0 210 297"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="none" stroke="black" stroke-width="0.25"
            d="m190.46 99.821-51.983-4.2254-20.081-48.132-7.9962 1e-6 -20.081 48.132-51.983 4.2254-2.471 7.6042 39.572 33.972-12.045 50.744 6.469 4.6991 44.538-27.136 44.538 27.136 6.4691-4.699-12.046-50.744 39.572-33.972z"
        />
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_000" width="3.4983499" height="3.4983211" x="108.30149" y="167.11479"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_001" width="3.4983499" height="3.4983211" x="99.601196" y="172.26358"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_002" width="3.4983499" height="3.4983211" x="90.900932" y="177.40973"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_003" width="3.4983499" height="3.4983211" x="82.200661" y="182.55586"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_004" width="3.4983499" height="3.4983211" x="73.50045" y="187.70467"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_005" width="3.4983499" height="3.4983211" x="67.052284" y="189.74989"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_006" width="3.4983499" height="3.4983211" x="67.006783" y="182.98714"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_007" width="3.4983499" height="3.4983211" x="69.213402" y="173.12083"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_008" width="3.4983499" height="3.4983211" x="71.42028" y="163.25684"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_009" width="3.4983499" height="3.4983211" x="73.626915" y="153.39053"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_010" width="3.4983499" height="3.4983211" x="75.833534" y="143.52687"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_011" width="3.4983499" height="3.4983211" x="73.145103" y="135.25102"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_012" width="3.4983499" height="3.4983211" x="65.561348" y="128.56764"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_013" width="3.4983499" height="3.4983211" x="57.977615" y="121.88427"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_014" width="3.4983499" height="3.4983211" x="50.39386" y="115.20089"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_015" width="3.4983499" height="3.4983211" x="42.810104" y="108.51487"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_016" width="3.4983499" height="3.4983211" x="38.870468" y="103.01683"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_017" width="3.4983499" height="3.4983211" x="45.290314" y="100.88164"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_018" width="3.4983499" height="3.4983211" x="55.354538" y="99.931793"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_019" width="3.4983499" height="3.4983211" x="65.41848" y="98.981934"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_020" width="3.4983499" height="3.4983211" x="75.482704" y="98.032082"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_021" width="3.4983499" height="3.4983211" x="85.546684" y="97.08223"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_022" width="3.4983499" height="3.4983211" x="92.58535" y="91.969421"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_023" width="3.4983499" height="3.4983211" x="96.598595" y="82.691277"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_024" width="3.4983499" height="3.4983211" x="100.61185" y="73.413132"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_025" width="3.4983499" height="3.4983211" x="104.62511" y="64.135254"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_026" width="3.4983499" height="3.4983211" x="108.63835" y="54.857109"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_027" width="3.4983499" height="3.4983211" x="112.65161" y="49.410923"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_028" width="3.4983499" height="3.4983211" x="116.66486" y="54.857109"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_029" width="3.4983499" height="3.4983211" x="120.67811" y="64.135254"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_030" width="3.4983499" height="3.4983211" x="124.69137" y="73.413132"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_031" width="3.4983499" height="3.4983211" x="128.70462" y="82.691277"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_032" width="3.4983499" height="3.4983211" x="132.71786" y="91.969421"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_033" width="3.4983499" height="3.4983211" x="139.75653" y="97.08223"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_034" width="3.4983499" height="3.4983211" x="149.82051" y="98.032082"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_035" width="3.4983499" height="3.4983211" x="159.88474" y="98.981934"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_036" width="3.4983499" height="3.4983211" x="169.94868" y="99.931793"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_037" width="3.4983499" height="3.4983211" x="180.01291" y="100.88164"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_038" width="3.4983499" height="3.4983211" x="186.43275" y="103.01683"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_039" width="3.4983499" height="3.4983211" x="182.49312" y="108.51487"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_040" width="3.4983499" height="3.4983211" x="174.90936" y="115.20089"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_041" width="3.4983499" height="3.4983211" x="167.32561" y="121.88427"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_042" width="3.4983499" height="3.4983211" x="159.74187" y="128.56764"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_043" width="3.4983499" height="3.4983211" x="152.15811" y="135.25102"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_044" width="3.4983499" height="3.4983211" x="149.46968" y="143.52687"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_045" width="3.4983499" height="3.4983211" x="151.6763" y="153.39053"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_046" width="3.4983499" height="3.4983211" x="153.88293" y="163.25684"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_047" width="3.4983499" height="3.4983211" x="156.08981" y="173.12083"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_048" width="3.4983499" height="3.4983211" x="158.29643" y="182.98714"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_049" width="3.4983499" height="3.4983211" x="158.25093" y="189.74989"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_050" width="3.4983499" height="3.4983211" x="151.80276" y="187.70467"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_051" width="3.4983499" height="3.4983211" x="143.10255" y="182.55586"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_052" width="3.4983499" height="3.4983211" x="134.40228" y="177.40973"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_053" width="3.4983499" height="3.4983211" x="125.70202" y="172.26358"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_054" width="3.4983499" height="3.4983211" x="117.00173" y="167.11479"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_055" width="3.4983499" height="3.4983211" x="116.80112" y="160.01073"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_056" width="3.4983499" height="3.4983211" x="125.10018" y="164.60654"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_057" width="3.4983499" height="3.4983211" x="133.39923" y="169.20235"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_058" width="3.4983499" height="3.4983211" x="141.69827" y="173.79552"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_059" width="3.4983499" height="3.4983211" x="149.99725" y="178.39133"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_060" width="3.4983499" height="3.4983211" x="148.19186" y="169.078"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_061" width="3.4983499" height="3.4983211" x="146.38638" y="159.7644"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_062" width="3.4983499" height="3.4983211" x="144.58092" y="150.45366"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_063" width="3.4983499" height="3.4983211" x="142.77544" y="141.14032"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_064" width="3.4983499" height="3.4983211" x="145.33998" y="133.24812"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_065" width="3.4983499" height="3.4983211" x="152.27452" y="126.77377"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_066" width="3.4983499" height="3.4983211" x="159.20924" y="120.30206"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_067" width="3.4983499" height="3.4983211" x="166.14372" y="113.82771"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_068" width="3.4983499" height="3.4983211" x="173.07819" y="107.356"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_069" width="3.4983499" height="3.4983211" x="163.66351" y="106.19448"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_070" width="3.4983499" height="3.4983211" x="154.24858" y="105.03296"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_071" width="3.4983499" height="3.4983211" x="144.83359" y="103.87408"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_072" width="3.4983499" height="3.4983211" x="135.41869" y="102.71256"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_073" width="3.4983499" height="3.4983211" x="128.70462" y="97.833649"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_074" width="3.4983499" height="3.4983211" x="124.69137" y="89.238922"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_075" width="3.4983499" height="3.4983211" x="120.67811" y="80.643402"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_076" width="3.4983499" height="3.4983211" x="116.66486" y="72.048149"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_077" width="3.4983499" height="3.4983211" x="112.65161" y="63.452629"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_078" width="3.4983499" height="3.4983211" x="108.63835" y="72.048149"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_079" width="3.4983499" height="3.4983211" x="104.62511" y="80.643402"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_080" width="3.4983499" height="3.4983211" x="100.61185" y="89.238922"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_081" width="3.4983499" height="3.4983211" x="96.598595" y="97.833649"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_082" width="3.4983499" height="3.4983211" x="89.884529" y="102.71256"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_083" width="3.4983499" height="3.4983211" x="80.469627" y="103.87408"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_084" width="3.4983499" height="3.4983211" x="71.054634" y="105.03296"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_085" width="3.4983499" height="3.4983211" x="61.639706" y="106.19448"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_086" width="3.4983499" height="3.4983211" x="52.225037" y="107.356"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_087" width="3.4983499" height="3.4983211" x="59.1595" y="113.82771"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_088" width="3.4983499" height="3.4983211" x="66.093971" y="120.30206"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_089" width="3.4983499" height="3.4983211" x="73.028694" y="126.77377"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_090" width="3.4983499" height="3.4983211" x="79.963234" y="133.24812"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_091" width="3.4983499" height="3.4983211" x="82.527779" y="141.14032"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_092" width="3.4983499" height="3.4983211" x="80.722298" y="150.45366"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_093" width="3.4983499" height="3.4983211" x="78.916832" y="159.7644"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_094" width="3.4983499" height="3.4983211" x="77.111351" y="169.078"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_095" width="3.4983499" height="3.4983211" x="75.305962" y="178.39133"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_096" width="3.4983499" height="3.4983211" x="83.604942" y="173.79552"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_097" width="3.4983499" height="3.4983211" x="91.903984" y="169.20235"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_098" width="3.4983499" height="3.4983211" x="100.20304" y="164.60654"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_099" width="3.4983499" height="3.4983211" x="108.5021" y="160.01073"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_100" width="3.4983499" height="3.4983211" x="108.7027" y="152.90668"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_101" width="3.4983499" height="3.4983211" x="100.80486" y="156.94949"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_102" width="3.4983499" height="3.4983211" x="92.907021" y="160.99232"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_103" width="3.4983499" height="3.4983211" x="85.009178" y="165.03516"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_104" width="3.4983499" height="3.4983211" x="86.413429" y="156.27461"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_105" width="3.4983499" height="3.4983211" x="87.817711" y="147.51414"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_106" width="3.4983499" height="3.4983211" x="89.221962" y="138.75378"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_107" width="3.4983499" height="3.4983211" x="86.78138" y="131.24258"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_108" width="3.4983499" height="3.4983211" x="80.495995" y="124.97989"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_109" width="3.4983499" height="3.4983211" x="74.210579" y="118.71985"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_110" width="3.4983499" height="3.4983211" x="67.925148" y="112.45717"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_111" width="3.4983499" height="3.4983211" x="76.691048" y="111.08398"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_112" width="3.4983499" height="3.4983211" x="85.456642" y="109.71344"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_113" width="3.4983499" height="3.4983211" x="94.222374" y="108.34289"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_114" width="3.4983499" height="3.4983211" x="100.61185" y="103.69946"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_115" width="3.4983499" height="3.4983211" x="104.62511" y="95.785767"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_116" width="3.4983499" height="3.4983211" x="108.63835" y="87.873672"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_117" width="3.4983499" height="3.4983211" x="112.65161" y="79.961044"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_118" width="3.4983499" height="3.4983211" x="116.66486" y="87.873672"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_119" width="3.4983499" height="3.4983211" x="120.67811" y="95.785767"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_120" width="3.4983499" height="3.4983211" x="124.69137" y="103.69946"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_121" width="3.4983499" height="3.4983211" x="131.08084" y="108.34289"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_122" width="3.4983499" height="3.4983211" x="139.84657" y="109.71344"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_123" width="3.4983499" height="3.4983211" x="148.61217" y="111.08398"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_124" width="3.4983499" height="3.4983211" x="157.37807" y="112.45717"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_125" width="3.4983499" height="3.4983211" x="151.09264" y="118.71985"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_126" width="3.4983499" height="3.4983211" x="144.80722" y="124.97989"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_127" width="3.4983499" height="3.4983211" x="138.52184" y="131.24258"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_128" width="3.4983499" height="3.4983211" x="136.08125" y="138.75378"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_129" width="3.4983499" height="3.4983211" x="137.4855" y="147.51414"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_130" width="3.4983499" height="3.4983211" x="138.88979" y="156.27461"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_131" width="3.4983499" height="3.4983211" x="140.29404" y="165.03516"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_132" width="3.4983499" height="3.4983211" x="132.39619" y="160.99232"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_133" width="3.4983499" height="3.4983211" x="124.49836" y="156.94949"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_134" width="3.4983499" height="3.4983211" x="116.60052" y="152.90668"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_135" width="3.4983499" height="3.4983211" x="116.39991" y="145.8026"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_136" width="3.4983499" height="3.4983211" x="123.89654" y="149.29504"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_137" width="3.4983499" height="3.4983211" x="131.39316" y="152.78484"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_138" width="3.4983499" height="3.4983211" x="130.39012" y="144.57462"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_139" width="3.4983499" height="3.4983211" x="129.38705" y="136.36723"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_140" width="3.4983499" height="3.4983211" x="131.70364" y="129.23705"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_141" width="3.4983499" height="3.4983211" x="137.33984" y="123.18602"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_142" width="3.4983499" height="3.4983211" x="142.97606" y="117.135"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_143" width="3.4983499" height="3.4983211" x="134.85954" y="115.55279"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_144" width="3.4983499" height="3.4983211" x="126.743" y="113.97058"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_145" width="3.4983499" height="3.4983211" x="120.67811" y="109.56527"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_146" width="3.4983499" height="3.4983211" x="116.66486" y="102.33421"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_147" width="3.4983499" height="3.4983211" x="112.65161" y="95.103935"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_148" width="3.4983499" height="3.4983211" x="108.63835" y="102.33421"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_149" width="3.4983499" height="3.4983211" x="104.62511" y="109.56527"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_150" width="3.4983499" height="3.4983211" x="98.560219" y="113.97058"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_151" width="3.4983499" height="3.4983211" x="90.443672" y="115.55279"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_152" width="3.4983499" height="3.4983211" x="82.327156" y="117.135"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_153" width="3.4983499" height="3.4983211" x="87.963371" y="123.18602"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_154" width="3.4983499" height="3.4983211" x="93.599571" y="129.23705"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_155" width="3.4983499" height="3.4983211" x="95.916161" y="136.36723"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_156" width="3.4983499" height="3.4983211" x="94.913094" y="144.57462"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_157" width="3.4983499" height="3.4983211" x="93.910057" y="152.78484"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_158" width="3.4983499" height="3.4983211" x="101.40671" y="149.29478"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_159" width="3.4983499" height="3.4983211" x="108.90331" y="145.8026"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_160" width="3.4983499" height="3.4983211" x="109.1039" y="138.69823"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_161" width="3.4983499" height="3.4983211" x="102.00851" y="141.63774"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_162" width="3.4983499" height="3.4983211" x="102.61033" y="133.9807"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_163" width="3.4983499" height="3.4983211" x="100.41772" y="127.23414"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_164" width="3.4983499" height="3.4983211" x="95.430702" y="121.39479"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_165" width="3.4983499" height="3.4983211" x="102.89806" y="119.60092"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_166" width="3.4983499" height="3.4983211" x="108.63835" y="115.42844"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_167" width="3.4983499" height="3.4983211" x="112.65161" y="108.88264"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_168" width="3.4983499" height="3.4983211" x="116.66486" y="115.42844"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_169" width="3.4983499" height="3.4983211" x="122.40516" y="119.60092"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_170" width="3.4983499" height="3.4983211" x="129.87251" y="121.39479"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_171" width="3.4983499" height="3.4983211" x="124.88549" y="127.23414"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_172" width="3.4983499" height="3.4983211" x="122.69289" y="133.9807"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_173" width="3.4983499" height="3.4983211" x="123.29471" y="141.63774"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_174" width="3.4983499" height="3.4983211" x="116.1993" y="138.69823"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_175" width="3.4983499" height="3.4983211" x="115.99869" y="131.5968"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_176" width="3.4983499" height="3.4983211" x="118.06731" y="125.2286"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_177" width="3.4983499" height="3.4983211" x="112.65161" y="121.29425"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_178" width="3.4983499" height="3.4983211" x="107.23591" y="125.2286"/>
        <rect class="pixel" fill="white" stroke="black" stroke-width="0.25" id="rect_179" width="3.4983499" height="3.4983211" x="109.30453" y="131.5968"/>
      </svg>
    `;
  }
}
