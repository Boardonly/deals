import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import uuid from 'react-uuid';

export default function Row({ row }) {
  const [open, setOpen] = React.useState(false);
  const classes = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.client.name}
        </TableCell>
        <TableCell align='right'>{row.client.phone}</TableCell>
        <TableCell align='right'>{row.date}</TableCell>
        <TableCell align='right'>{row.time}</TableCell>
        <TableCell align='right'>{row.winch.name}</TableCell>
        <TableCell align='right'>{row.winchPaid ? <CheckCircleOutlineIcon /> : ''}</TableCell>
        <TableCell align='right'>{row.teacher ? row.teacher.client.name : ''}</TableCell>
        <TableCell align='right'>{row.teacherPaid ? <CheckCircleOutlineIcon /> : ''}</TableCell>
        <TableCell align='right'>{row.bookedAdmin ? <CheckCircleOutlineIcon /> : ''}</TableCell>
        <TableCell align='right'>{row.client._id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography gutterBottom component='div'>
                Details
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableBody>
                  <TableRow display='none'>
                    <TableCell>Teacher:</TableCell>
                    <TableCell>{row.teacher ? row.teacher.client.name : '5'}</TableCell>
                    <TableCell>{row.teacher ? row.teacher.client.phone : '1'}</TableCell>
                    <TableCell>{row.teacher ? `paid:${row.teacherPaid}` : '6'}</TableCell>
                    <TableCell>{row.teacher ? row.teacher.client._id : '6'}</TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  {row.equipment.map((item, i) => (
                    <TableRow key={uuid()}>
                      <TableCell align='justify'>{`Equipment-${i + 1}:`}</TableCell>
                      <TableCell>{item.equipment.name || '2'}</TableCell>
                      <TableCell>{item.equipment.price || '3'}</TableCell>
                      <TableCell>{`paid:${item.paid}` || '4'}</TableCell>
                      <TableCell align='right'>{item.equipment.description || '7'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}