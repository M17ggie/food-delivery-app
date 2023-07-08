import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import { AccountCircle } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logoutHandler } from '../../store/auth/authReducer';

const UserDropdown = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const handleListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    };

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logoutHandler());
    }

    return (
        <div>
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                startIcon={<AccountCircle style={{ color: 'white' }} />}
                style={{ color: 'white' }}
            >
                User
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <MenuList autoFocus={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My Account</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default UserDropdown;