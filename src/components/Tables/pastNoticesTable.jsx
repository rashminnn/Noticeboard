import * as React from "react";
import {
  Box,
  Paper,
  Skeleton,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import ImageViewDialog from "../Dialogs/ImageViewDialog";
import { set } from "react-hook-form";
import moment from "moment";
import { deleteNotice } from "../../scripts/firestore";
import { fetchPastNoticesThunk } from "../../features/pastNoticesSlice";

// Styles with styled-component

export const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
  :hover {
    background-color: #d9d9d9;
  }
`;


// The main table

const TableUI = ({
  data,
  columns,
  isFetching,
  skeletonCount = 10,
  skeletonHeight = 28,
  // headerComponent,
  onClickRow,
  page,
  EmptyText,
  // children,
  handleRow,
}) => {

  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);
  // const memoisedHeaderComponent = useMemo(
  //   () => headerComponent,
  //   [headerComponent]
  // );

  const { getHeaderGroups, getRowModel, getAllColumns } = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const skeletons = Array.from({ length: skeletonCount }, (x, i) => i);

  const columnCount = getAllColumns().length;

  const noDataFound =
    !isFetching && (!memoizedData || memoizedData.length === 0);


  const [imageViewOpen, setImageViewOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const dispatch = useDispatch()

  const handleDelete = async (id, fileUrl) => {
    const deleted = await deleteNotice(id, fileUrl)
    dispatch(fetchPastNoticesThunk())
  }

  return (
    <Paper elevation={2} style={{ padding: "0 0 1rem 0" }}>
      {page && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
        />
      )}

      <Box style={{ overflowX: "auto" }}>
        <MuiTable>
          {!isFetching && (
            <TableHead>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      sx={{ fontWeight: 600, fontSize: 13 }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableCell>
                  ))}
                  <TableCell sx={{ fontWeight: 600 }}>
                    <span>Actions</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableHead>
          )}
          <TableBody>
            {!isFetching ? (
              getRowModel()?.rows.map((row) => (
                <StyledTableRow key={row.id} onClick={handleRow}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      onClick={() => onClickRow?.(cell, row)}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 2 }}
                      onClick={() => {
                        setImageViewOpen(true);
                        setCurrentItem(row.original)
                        console.log({ row: row.original })
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => {
                        handleDelete(row.original.id, row.original.file)
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <>
                {skeletons.map((skeleton) => (
                  <TableRow key={skeleton}>
                    {Array.from({ length: columnCount }, (x, i) => i).map(
                      (elm) => (
                        <TableCell key={elm}>
                          <Skeleton height={skeletonHeight} />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </MuiTable>
      </Box>
      {noDataFound && (
        <Box my={2} textAlign="center">
          {EmptyText}
        </Box>
      )}
      <ImageViewDialog open={imageViewOpen} setOpen={setImageViewOpen} title={currentItem?.title}>
        <Box sx={{ p: 2 }}>
          <Typography component="div" sx={{ mb: 3, fontWeight: 'bold' }}>Posted At : {moment(currentItem?.createdAt).format(
            'YYYY-MM-DD [at] HH:mm A'
          )}</Typography>
          <Box sx={{ p: 1, border: 'solid 1px black' }}>
            <img src={currentItem?.file} alt={currentItem?.title} style={{ width: "100%" }} />
          </Box>

        </Box>

      </ImageViewDialog>
    </Paper>
  );
};

TableUI.defaultProps = {
  EmptyText: "No Data is found",
};

export default memo(TableUI);
