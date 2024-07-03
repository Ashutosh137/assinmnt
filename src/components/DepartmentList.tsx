import React, { useState } from 'react';
import { Checkbox, List, ListItem, ListItemText, Collapse, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const departments = [
    {
        name: 'Human Resources',
        subDepartments: ['Recruitment', 'Employee Relations', 'Payroll', 'Training & Development'],
    },
    {
        name: 'Finance',
        subDepartments: ['Accounts Payable', 'Accounts Receivable', 'Financial Planning', 'Reporting'],
    },
    {
        name: 'IT',
        subDepartments: ['Infrastructure', 'Development', 'Security', 'Support'],
    },
    {
        name: 'Marketing',
        subDepartments: ['Content Creation', 'SEO', 'Social Media', 'Advertising'],
    },
    {
        name: 'Sales',
        subDepartments: ['Lead Generation', 'Account Management', 'Customer Success', 'Sales Operations'],
    },
    {
        name: 'Operations',
        subDepartments: ['Supply Chain', 'Logistics', 'Quality Control', 'Production'],
    },
    {
        name: 'Customer Service',
        subDepartments: ['Call Center', 'Technical Support', 'Feedback & Complaints', 'Customer Retention'],
    },
    {
        name: 'Legal',
        subDepartments: ['Compliance', 'Litigation', 'Contract Management', 'Intellectual Property'],
    },
    {
        name: 'Research and Development',
        subDepartments: ['Product Research', 'Prototype Development', 'Testing & QA', 'Innovation'],
    },
    {
        name: 'Administration',
        subDepartments: ['Facility Management', 'Office Supplies', 'Travel Coordination', 'Secretarial Support'],
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
                        <ListItemText onClick={() => handleToggle(department.name)} primary={department.name} />
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
