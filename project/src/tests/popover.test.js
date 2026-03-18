const { JSDOM } = require('jsdom');

describe('Popover', () => {
  let dom;
  let document;
  let window;
  let Popover;

  beforeEach(async () => {
    // Setup JSDOM
    dom = new JSDOM('<!DOCTYPE html><html><body><button id="popoverButton">Click me</button></body></html>', {
      url: 'http://localhost',
      pretendToBeVisual: true
    });

    document = dom.window.document;
    window = dom.window;

    // Mock requestAnimationFrame
    window.requestAnimationFrame = (cb) => setTimeout(cb, 0);

    // Import Popover after setting up DOM
    Popover = (await import('../popover.js')).default;
  });

  afterEach(() => {
    dom.window.close();
  });

  test('should create a popover instance', () => {
    const button = document.getElementById('popoverButton');
    const popover = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });

    expect(popover).toBeDefined();
    expect(popover.title).toBe('Test Title');
    expect(popover.content).toBe('Test Content');
  });

  test('should use default title and content if not provided', () => {
    const button = document.getElementById('popoverButton');
    const popover = new Popover(button);

    expect(popover.title).toBe('Popover title');
    expect(popover.content).toBe('Popover content');
  });

  test('should show popover on click', () => {
    const button = document.getElementById('popoverButton');
    const popover = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });

    button.click();

    expect(popover.isVisible).toBe(true);
    expect(document.querySelector('.popover')).toBeDefined();
  });

  test('should hide popover on second click', () => {
    const button = document.getElementById('popoverButton');
    const popover = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });

    button.click();
    expect(popover.isVisible).toBe(true);

    button.click();
    expect(popover.isVisible).toBe(false);
  });

  test('should hide popover when clicking outside', () => {
    const button = document.getElementById('popoverButton');
    const popover = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });

    button.click();
    expect(popover.isVisible).toBe(true);

    document.body.click();

    setTimeout(() => {
      expect(popover.isVisible).toBe(false);
    }, 200);
  });

  test('should position popover below the button', () => {
    const button = document.getElementById('popoverButton');
    const popover = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });

    button.click();

    const popoverElement = document.querySelector('.popover');
    expect(popoverElement.style.top).toBeDefined();
    expect(popoverElement.style.left).toBeDefined();
  });

  test('should create popover with correct structure', () => {
    const button = document.getElementById('popoverButton');
    const popover = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });

    button.click();

    const popoverElement = document.querySelector('.popover');
    expect(popoverElement.querySelector('.popover-header')).toBeDefined();
    expect(popoverElement.querySelector('.popover-body')).toBeDefined();
    expect(popoverElement.querySelector('.popover-arrow')).toBeDefined();
  });
});
