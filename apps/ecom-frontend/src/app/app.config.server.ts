 import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { baseConfig } from './app.config';
import { UNIVERSAL_PROVIDERS } from '@ng-web-apis/universal';
import { DOCUMENT } from '@angular/common';

// Mock document for SSR
const mockDocument = {
  body: {
    appendChild: () => {},
    removeChild: () => {},
    style: {},
  },
  createElement: (tagName: string) => ({
    textContent: '',
    innerHTML: '',
    appendChild: () => {},
    removeChild: () => {},
    setAttribute: () => {},
    getAttribute: () => null,
    hasAttribute: () => false,
    removeAttribute: () => {},
    style: {},
    classList: {
      add: () => {},
      remove: () => {},
      contains: () => false,
    },
  }),
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  addEventListener: () => {},
  removeEventListener: () => {},
  activeElement: null,
  head: {
    appendChild: () => {},
    removeChild: () => {},
  },
  documentElement: {
    style: {},
  },
  defaultView: null,
  location: {
    href: '',
    pathname: '',
    search: '',
    hash: '',
  },
  title: '',
  URL: '',
  readyState: 'complete',
} as any;

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    UNIVERSAL_PROVIDERS,
    { provide: DOCUMENT, useValue: mockDocument }
  ],
};

export const config = mergeApplicationConfig(baseConfig, serverConfig);
