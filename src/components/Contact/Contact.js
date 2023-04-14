import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
} from "@mui/material";
import Axios from "../../api";
import AlertModal from "../Modal/AlertModal";
import Modal from "../Modal/Modal";
import Navbar from "../Navbar/Navbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Contact = () => {
  const [contacts, setContacts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [contactId, setContactId] = React.useState(null);
  const [showAlertModal, setShowAlertModal] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [name, setName] = React.useState(null);
  const [contact, setContact] = React.useState(null);
  const [updateContact, setUpdateContact] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const updateContactHandler = async () => {
    await Axios({
      url: `/contact/${contactId}`,
      method: "put",
      data: { name, phoneNumber: contact },
    })
      .then((res) => {
        setIsError(false);
        setShowAlert(true);
        setAlertMessage(res.data.message);
      })
      .catch((err) => {
        setIsError(true);
        setShowAlert(true);
        setAlertMessage(err.response.data.message);
      });
    setShowModal(false);
    getContacts();
  };

  const addContactHandler = async () => {
    await Axios({
      url: `/contact`,
      method: "post",
      data: { name, phoneNumber: contact },
    })
      .then((res) => {
        setIsError(false);
        setShowAlert(true);
        setAlertMessage(res.data.message);
      })
      .catch((err) => {
        setIsError(true);
        setShowAlert(true);
        setAlertMessage(err.response.data.message);
      });
    setShowModal(false);
    getContacts();
  };

  const deleteContactHandler = async () => {
    setShowAlertModal(false);
    await Axios({
      method: "delete",
      url: `/contact/${contactId}`,
    })
      .then((res) => {
        setIsError(false);
        setShowAlert(true);
        setAlertMessage(res.data.message);
      })
      .catch((err) => {
        setIsError(true);
        setShowAlert(true);
        setAlertMessage(err.response.data.message);
      });
    getContacts();
  };

  const getContacts = async () => {
    await Axios("/contact")
      .then((res) => {
        setContacts(res.data.data);
      })
      .catch((err) => {
        setIsError(true);
        setShowAlert(true);
        setAlertMessage(err.response.data.message);
      });
    setIsLoading(false);
  };

  const searchHandler = async () => {
    await Axios(`/contact?searchTerm=${searchTerm}`)
      .then((res) => {
        setContacts(res.data.data);
      })
      .catch((err) => {
        setIsError(true);
        setShowAlert(true);
        setAlertMessage(err.response.data.message);
      });
    setIsLoading(false);
  };

  React.useEffect(() => {
    getContacts();
  }, []);

  React.useEffect(() => {
    searchHandler();
  }, [searchTerm]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={isError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      {showAlertModal && (
        <AlertModal
          open={showAlertModal}
          setOpen={setShowAlertModal}
          title="Delete Contact"
          content="Are you sure you want to delete this Contact?"
          successButton="Delete"
          onSuccess={deleteContactHandler}
        />
      )}
      {showModal && (
        <Modal
          open={showModal}
          setOpen={setShowModal}
          onSuccess={updateContact ? updateContactHandler : addContactHandler}
          title={updateContact ? "Update Contact" : "Add Contact"}
          label="Name"
          label1="Phone Number"
          enteredValue={name}
          enteredValue1={contact}
          setEnteredvalue={setName}
          setEnteredvalue1={setContact}
          successButton={updateContact ? "Update" : "Add"}
          content={`To ${
            updateContact ? "Update" : "Add"
          } Contact Deatils Please Enter Name and Phone Number.`}
        />
      )}
      {!contacts.length && (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "120px",
          }}
        >
          No Contacts Found
        </h1>
      )}
      {!!contacts.length && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300, mt: 9 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ fontWeight: 700 }}>Name</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }}>
                  Phone number
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }}>
                  Edit Contact
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }}>
                  Delete Course
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.phoneNumber}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      onClick={() => {
                        setContactId(row._id);
                        setShowModal(true);
                        setName(row.name);
                        setContact(row.phoneNumber);
                        setUpdateContact(true);
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      onClick={() => {
                        setContactId(row._id);
                        setShowAlertModal(true);
                      }}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Fab
        onClick={() => {
          setShowModal(true);
          setName(null);
          setContact(null);
          setUpdateContact(false);
        }}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
        }}
        aria-label="Add"
        color="primary"
      >
        <AddIcon />
      </Fab>
    </Stack>
  );
};

export default Contact;
