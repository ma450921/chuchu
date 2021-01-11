import {Curtains} from '../index.mjs';
import {JSDOM} from 'jsdom';
const dom = new JSDOM()
global.document = dom.window.document;
global.window = dom.window;
describe('construct Curtains', () => {
    // webgl params
    const defaultParam = {
        container: document.createElement('div'),
        alpha: true,
        premultipliedAlpha: false,
        antialias: true,
        depth: true,
        failIfMajorPerformanceCaveat: true,
        preserveDrawingBuffer: false,
        stencil: false,
        autoResize: true,
        autoRender: true,
        watchScroll: true,
        pixelRatio: window.devicePixelRatio || 1,
        renderingScale: 1,
        production: false
    }
    const curtainEntity = new Curtains(defaultParam);
    it('private parameters are constructed safely', () => {
        curtainEntity._autoResize = defaultParam.autoResize;
        curtainEntity._autoRender = defaultParam.autoRender;
        curtainEntity._watchScroll = defaultParam.watchScroll;
        curtainEntity._renderingScale = defaultParam.renderingScale;
    });

    it('webgl parameters are constructed safely', () => {
        curtainEntity.premultipliedAlpha = defaultParam.premultipliedAlpha;
        curtainEntity.alpha = defaultParam.alpha;
        curtainEntity.antialias = defaultParam.antialias;
        curtainEntity.depth = defaultParam.depth;
        curtainEntity.failIfMajorPerformanceCaveat = defaultParam.failIfMajorPerformanceCaveat;
        curtainEntity.preserveDrawingBuffer = defaultParam.preserveDrawingBuffer;
        curtainEntity.stencil = defaultParam.stencil;
    });
})