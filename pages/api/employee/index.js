import nc from "next-connect";
import onError from "../../../common/errorMiddleware";
import {
  getAllEmployees,
  createEmployee,
} from "../../../controller/employee/employee";

// const handler = nc();
const handler = nc({ onError });

handler.get(getAllEmployees);

handler.post(createEmployee);

export default handler;
