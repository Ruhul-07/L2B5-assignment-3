export const sendResponse = <T>(res: any, data: {
  success: boolean;
  message: string;
  data: T;
}) => {
  res.status(200).json(data);
};