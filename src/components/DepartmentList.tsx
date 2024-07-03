import React, { useState } from 'react';
import { Checkbox, List, ListItem, ListItemText, Collapse, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const departments = [
  {
    name: 'Department A',
    subDepartments: ['Sub A1', 'Sub A2'],
  },
  {
    name: 'Department B',
    subDepartments: ['Sub B1', 'Sub B2'],
  },
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (name: string) => {
    setOpen({ ...open, [name]: !open[name] });
  };

  const handleSelect = (name: string, isParent: boolean) => {
    const newSelected = { ...selected, [name]: !selected[name] };

    if (isParent) {
      departments
        .find(dept => dept.name === name)
        ?.subDepartments.forEach(subDept => {
          newSelected[subDept] = newSelected[name];
        });
    } else {
      const parent = departments.find(dept => dept.subDepartments.includes(name));
      if (parent) {
        const allSelected = parent.subDepartments.every(subDept => newSelected[subDept]);
        newSelected[parent.name] = allSelected;
      }
    }

    setSelected(newSelected);
  };

  return (
    <List>
      {departments.map(department => (
        <React.Fragment key={department.name}>
          <ListItem>
            <Checkbox
              checked={selected[department.name] || false}
              onChange={() => handleSelect(department.name, true)}
            />
            <ListItemText primary={department.name} />
            <IconButton onClick={() => handleToggle(department.name)}>
              {open[department.name] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={open[department.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map(subDept => (
                <ListItem key={subDept} sx={{ pl: 4 }}>
                  <Checkbox
                    checked={selected[subDept] || false}
                    onChange={() => handleSelect(subDept, false)}
                  />
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
