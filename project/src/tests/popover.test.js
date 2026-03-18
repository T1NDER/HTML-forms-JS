const Popover = require('../popover.js').default;

describe('Popover', () => {
  let button;
  let popover;

  beforeEach(() => {
    document.body.innerHTML = '<button id="popoverButton">Click me</button>';
    button = document.getElementById('popoverButton');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    document.body.innerHTML = '';
  });

  test('should create a popover instance', () => {
    popover = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });

    expect(popover).toBeDefined();
    expect(popover.title).toBe('Test Title');
    expect(popover.content).toBe('Test Content');
  });

  test('should use default title and content if not provided', () => {
    popover = new Popover(button);

    expect(popover.title).toBe('Popover title');
    expect(popover.content).toBe('Popover content');
  });

  test('should show popover on click', () => {
    popover = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });

    button.click();

    expect(popover.isVisible).toBe(true);
    expect(document.querySelector('.popover')).toBeDefined();
  });

  test('should hide popover on second click', () => {
    jest.useFakeTimers();
    
    popover = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });

    button.click();
    expect(popover.isVisible).toBe(true);

    button.click();
    
    jest.advanceTimersByTime(200);
    
    expect(popover.isVisible).toBe(false);
  });

  test('should hide popover when clicking outside', () => {
    jest.useFakeTimers();
    
    popover = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });

    button.click();
    expect(popover.isVisible).toBe(true);

    document.body.click();

    jest.advanceTimersByTime(200);

    expect(popover.isVisible).toBe(false);
  });

  test('should position popover below the button', () => {
    popover = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });

    button.click();

    const popoverElement = document.querySelector('.popover');
    expect(popoverElement.style.top).toBeDefined();
    expect(popoverElement.style.left).toBeDefined();
  });

  test('should create popover with correct structure', () => {
    popover = new Popover(button, {
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
