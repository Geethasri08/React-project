import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Payroll = () => {
  const navigate = useNavigate(); 

  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', salary: 50000 },
    { id: 2, name: 'Jane Doe', salary: 60000 },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    salary: 0,
  });

  const [payrollData, setPayrollData] = useState({
    totalSalary: 0,
    averageSalary: 0,
  });

  const calculatePayroll = () => {
    if (employees.some((employee) => !employee.name)) {
      alert('Cannot calculate payroll. All employees must have a name.');
      return;
    }

    const totalSalary = employees.reduce((total, employee) => total + employee.salary, 0);
    const averageSalary = totalSalary / employees.length || 0;

    setPayrollData({
      totalSalary,
      averageSalary,
    });
  };

  const addEmployee = () => {
    if (!newEmployee.name) {
      alert('Name is required to add an employee.');
      return;
    }

    setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
    setNewEmployee({ name: '', salary: 0 });
  };

  return (
    <Card>
      
      <CardContent>
        <Typography variant="h4">Payroll Management</Typography>

        <div>
          <Typography variant="h6">Employee List</Typography>
          <ul>
            {employees.map((employee) => (
              <li key={employee.id}>
                {employee.name} - ${employee.salary}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Typography variant="h6">Add Employee</Typography>
          <TextField
            label="Name"
            type="text"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          />
          <TextField
            label="Salary"
            type="number"
            value={newEmployee.salary}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, salary: parseInt(e.target.value, 10) })
            }
          />
          <Button onClick={addEmployee} variant="contained">
            Add Employee
          </Button>
        </div>

        <div>
          <Typography variant="h6">Payroll Information</Typography>
          <Typography>Total Salary: ${payrollData.totalSalary}</Typography>
          <Typography>Average Salary: ${payrollData.averageSalary}</Typography>
        </div>

        <Button onClick={calculatePayroll} variant="contained">
          Calculate Payroll
        </Button>
      </CardContent>
    </Card>
  );
};
export default Payroll;