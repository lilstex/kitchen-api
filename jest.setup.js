global.console = {
    ...console,
    log: jest.fn(), // suppress console.log
    error: jest.fn(), // suppress console.error
}
