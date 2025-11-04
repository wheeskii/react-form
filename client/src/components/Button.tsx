import { Button, type ButtonProps } from '@mui/material';

export function ContainedButton(props: ButtonProps) {
    return <Button variant='contained' disableElevation {...props}>{props.children}</Button>
}

export function LogoutButton(props: ButtonProps) {
    return <Button sx={{ color: 'white'}} {...props}>{props.children}</Button>
}

