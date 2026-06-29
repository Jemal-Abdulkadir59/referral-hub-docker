import React from 'react'
import { Box, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

export default function TableLoadingSkeleton({ rows = 5, columns = 6 }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {[...Array(columns)].map((_, idx) => (
              <TableCell key={idx}>
                <Skeleton variant='text' width='80%' />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(rows)].map((_, rowIdx) => (
            <TableRow key={rowIdx}>
              {[...Array(columns)].map((_, colIdx) => (
                <TableCell key={colIdx}>
                  <Skeleton variant='text' width='100%' height={30} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
