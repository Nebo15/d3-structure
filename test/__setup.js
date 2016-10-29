import { jsdom } from 'jsdom';

global.document = jsdom('<html><head><title></title></head><body></body></html>');
global.window = document.defaultView;;
