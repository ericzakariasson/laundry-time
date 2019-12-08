import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { bookLaundryRoom } from ".";

export const bookLaundry: APIGatewayProxyHandler = async (event, _context) => {
  try {
    await bookLaundryRoom();
    return response(200, { success: true });
  } catch (e) {
    return response(500, { success: false, error: e });
  }
};

const response = (statusCode: number, body: any) => ({
  statusCode,
  body: JSON.stringify(body)
});
