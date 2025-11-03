import { Button, type ButtonProps } from '@mui/material';

export function OutlinedButton(props: ButtonProps) {
    return <Button variant='contained' {...props}>{props.children}</Button>
}
export function LogoutButton(props: ButtonProps) {
    return <Button sx={{ color: 'white'}} {...props}>{props.children}</Button>
}
