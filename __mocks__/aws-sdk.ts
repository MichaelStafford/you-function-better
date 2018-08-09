export const sendEmailMock = jest.fn();
export const configUpdateMock = jest.fn();
export const config = ({
  update: configUpdateMock,
});

export const SES = jest.fn(() => ({
  sendEmail: (params) => ({ promise: () => sendEmailMock(params) }), 
}));