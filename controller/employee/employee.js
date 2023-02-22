// import pool from "../../connection/db";
import { executeQuery } from "../../connection/db";
import employeeValidate from "../../common/employeeValidate";
import ErrorHandler from "../../common/errorHandler";

const getAllEmployees = async (req, res) => {
  try {
    let employeeData = await executeQuery("select * from employee", []);
    res.status(200).json({ employeeData });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getEmployeeById = async (req, res, next) => {
  const id = req.query.id;
  try {
    let employeeData = await executeQuery(
      `select * from employee where id=${id}`,
      []
    );
    if (employeeData.length > 0) res.status(200).json({ employeeData });
    next(new ErrorHandler(`no employee found with this id`, 404));
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteEmployeeById = async (req, res) => {
  const id = req.query.id;
  try {
    let employeeData = await executeQuery(
      `delete from employee where id=${id}`,
      []
    );
     res.status(200).json({ employeeData });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createEmployee = async (req, res) => {
  // console.log(req.body);
  try {
    const { name, email, address, phone } = req.body;
    let { error } = employeeValidate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      let employeeData = await executeQuery(
        `insert into employee(name, email, address, phone) value(?, ?, ?, ?)`,
        [name, email, address, phone]
      );
      employeeData = await executeQuery(
        `select * from employee where id=${employeeData.insertId}`
      );
      res.status(200).json({ employeeData });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateEmployee = async (req, res) => {
  const id = req.query.id;
  // console.log(req.body);
  try {
    const { name, email, address, phone } = req.body;

    let employeeData = await executeQuery(`select * from employee where id=?`, [
      id,
    ]);
    if (employeeData.length > 0) {
      let { error } = employeeValidate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
      } else {
        employeeData = await executeQuery(
          `update employee set name=?, email=?, address=?, phone=? where id=?`,
          [name, email, address, phone, id]
        );
        res.status(200).json({ employeeData });
      }
    } else {
      res.status(400).json({ message: `employee not found on this id=${id}` });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export {
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  createEmployee,
  updateEmployee,
};
