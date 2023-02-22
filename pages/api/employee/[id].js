import nc from "next-connect";
import onError from "../../../common/errorMiddleware";
import {
  getEmployeeById,
  deleteEmployeeById,
  updateEmployee,
} from "../../../controller/employee/employee";

// const handler = nc();
const handler = nc({ onError });

handler.get(getEmployeeById);

handler.delete(deleteEmployeeById);

handler.put(updateEmployee);

export default handler;
