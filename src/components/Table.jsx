import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "../api/index";
import { v4 as uuidv4 } from "uuid";
import GoogleSpinner from "./Loader";

export default function UserTable({ filter }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [columns, setColumn] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getUser = async () => {
    setLoading(true);
    console.log(filter);
    await axios
      .get(`/user/${filter}`)
      .then((res) => {
        console.log("data", res?.data?.data);
        if (res?.data?.data.length < 1) return;
        setColumn(Object.keys(res?.data?.data[0]).slice(2, 11));
        setData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getUser();
  }, [filter]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div style={{ position: "fixed", top: 60, boxShadow: "0 2px 2px gray" }}>
      <TableContainer sx={{ maxHeight: "83vh" }}>
        <Table sx={{ width: "100vw" }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={uuidv4()}
                  align={"left"}
                  style={{ color: "white", backgroundColor: "#FF6000" }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading ? (
            <GoogleSpinner />
          ) : (
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column];
                        return <TableCell key={uuidv4()}>{value}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
