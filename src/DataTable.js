import { useEffect, useState } from "react";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";
import Pagination from '@mui/material/Pagination';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Checkbox, OutlinedInput } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const API = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"

const DataTable = () => {
    const [userData, setUserData] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        id: '',
        name: '',
        email: '',
        role: ''
    });
    const [search, setSearch] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const pageCount = Math.ceil(userData.length / recordsPerPage);
    const paginatedData = userData.slice(firstIndex, lastIndex);
    const filteredData = userData.filter((user) => {
        return search.toLowerCase() === ''
            ? user
            : user.name.toLowerCase().includes(search);
    })

    const fetchUsers = async (api) => {
        fetch(api)
            .then(res => res.json())
            .then(data => setUserData(data))
    }
    useEffect(() => {
        fetchUsers(API);
    }, []);

    const handleEditClick = (user) => {
        setEditUserId(user.id);
        const formValues = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        setEditFormData(formValues);
    }

    const handleEditFormData = (e) => {
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleSave = (e) => {
        e.preventDefault();
        const updatedData = {
            id: editUserId,
            name: editFormData.name,
            email: editFormData.email,
            role: editFormData.role
        }
        const newUserData = [...userData];
        const index = userData.findIndex((user) => user.id === editUserId);
        newUserData[index] = updatedData;
        setUserData(newUserData);
        setEditUserId(null);
    }

    const handleCancel = () => {
        setEditUserId(null);
    }

    const handleDelete = (userID) => {
        const newUserData = [...userData];
        const index = userData.findIndex((user) => user.id === userID);
        newUserData.splice(index, 1);
        setUserData(newUserData);
    }

    const handlePageChange = (e, newPage) => {
        setCurrentPage(newPage);
    }

    return (
        <>
            <div className="top-container">
                <OutlinedInput type="text" placeholder="search..." onChange={(e) => setSearch(e.target.value)} />
                <Button><DeleteIcon fontSize="large" style={{ color: 'red' }} /></Button>
            </div>
            <div>
                <TableContainer className="table-container">
                    <form onSubmit={handleSave}>
                        <Table>
                            <TableHead style={{ color: 'dark' }}>
                                <TableRow>
                                    <TableCell><Checkbox name="selectAll" /></TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    filteredData
                                        .slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10)
                                        .map((user) => {
                                            return (
                                                <>
                                                    {editUserId === user.id
                                                        ? <EditableRow editFormData={editFormData} handleEditFormData={handleEditFormData} handleCancel={handleCancel} />
                                                        : <ReadOnlyRow user={user} handleEditClick={handleEditClick} handleDelete={handleDelete} />}
                                                </>
                                            )
                                        })}
                            </TableBody>
                        </Table>
                    </form>
                    <div className="pagination">
                        <Pagination
                            count={pageCount}
                            page={currentPage}
                            showFirstButton
                            showLastButton
                            onChange={handlePageChange}
                            size="large"
                        />
                    </div>
                </TableContainer>
            </div>
        </>
    )
}

export default DataTable;