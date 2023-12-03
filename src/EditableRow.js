import SaveIcon from '@mui/icons-material/Save';
import { Input, TableCell, TableRow, Button, Checkbox } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const EditableRow = ({ editFormData, handleEditFormData, handleCancel }) => {
    return (
        <>
            <TableRow>
                <TableCell><Checkbox /></TableCell>
                <TableCell><Input type="text" required="required" value={editFormData.name} onChange={handleEditFormData} name="name" /></TableCell>
                <TableCell><Input type="text" required="required" value={editFormData.email} onChange={handleEditFormData} name="email" /></TableCell>
                <TableCell><Input type="text" required="required" value={editFormData.role} onChange={handleEditFormData} name="role" /></TableCell>
                <TableCell>
                    <Button type="submit"><SaveIcon fontSize="small" style={{ color: 'green' }} /></Button>
                    <Button onClick={handleCancel}><ClearOutlinedIcon fontSize="small" style={{ color: 'black' }} /></Button>
                </TableCell>
            </TableRow>
        </>
    )
}

export default EditableRow;