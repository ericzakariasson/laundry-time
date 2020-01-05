import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { bookLaundryRoom } from ".";

export const bookLaundry: APIGatewayProxyHandler = async (event, context) => {
  // try {
  const data = await bookLaundryRoom();
  return response(200, { success: true, message: data });
  // } catch (e) {
  //   return response(500, { success: false, error: e });
  // }
};

const response = (statusCode: number, body: any) => ({
  statusCode,
  body: JSON.stringify(body)
});
