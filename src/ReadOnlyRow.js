import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { TableCell, TableRow, Button, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ReadOnlyRow = ({ user, handleEditClick, handleDelete, handleCheckbox, checked }) => {
    return (
        <>
            <TableRow>
                <TableCell>
                    <Checkbox value={user.id} onClick={handleCheckbox} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                    <Button onClick={() => handleEditClick(user)}><ModeEditIcon fontSize="small" style={{ color: 'blue' }} /></Button>
                    <Button onClick={() => handleDelete(user.id)}><DeleteIcon fontSize="small" style={{ color: 'red' }} /></Button>
                </TableCell>
            </TableRow>
        </>
    )
}

export default ReadOnlyRow;